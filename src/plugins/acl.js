export default {
  install(Vue, {
    router,
    rules = [],
    redirect = null,
  } = {}) {
    // install acl
    Vue.prototype.$acl = {
      check(rule) {
        if (typeof rule === 'boolean') {
          return rule
        }

        if (!rule || rule === '*') {
          return true
        }

        if (Array.isArray(rule)) {
          const rulesParticles = rule
          for (let i = 0; i < rulesParticles.length; i++) {
            const ruleIndex = rules.findIndex((rule) => rule[rulesParticles[i]] === rule.name)
            if (ruleIndex > -1 && rules[ruleIndex].check(null, null)) {
              return true
            }
            else {
              return false
            }
          }
        }
        else {
          const ruleIndex = rules.findIndex((rule) => rule === rule.name)
          if (ruleIndex > -1 && rules[ruleIndex].check(null, null)) {
            return true
          }
          else {
            return false
          }
        }
      }
    };
    // router
    router.beforeEach((to, from, next) => {
      if (!to.meta.rule || to.meta.rule === '*') {
        return next();
      }

      if (Array.isArray(to.meta.rule)) {
        const rulesParticles = to.meta.rule
        for (let i = 0; i < rulesParticles.length; i++) {
          const ruleIndex = rules.findIndex((rule) => to.meta.rule[rulesParticles[i]] === rule.name)
          if (ruleIndex > -1 && rules[ruleIndex].check(to, from)) {
            return next();
          }
          else if (ruleIndex > -1 && rules[ruleIndex].redirect) {
            return next({
              path : rules[ruleIndex].redirect,
              query: { to: to.path }
            });
          }
          else if (redirect) {
            return next({
              path : redirect,
              query: { to: to.path }
            });
          }
        }
      }
      else {
        const ruleIndex = rules.findIndex((rule) => to.meta.rule === rule.name)
        if (ruleIndex > -1 && rules[ruleIndex].check(to, from)) {
          return next();
        }
        else if (ruleIndex > -1 && rules[ruleIndex].redirect !== undefined) {
          return next({
            path : rules[ruleIndex].redirect,
            query: { to: to.path }
          });
        }
        else if (redirect) {
          return next({
            path : redirect,
            query: { to: to.path }
          });
        }
      }

      if (redirect) {
        return next({
          path : redirect,
          query: { to: to.path }
        });
      }
      else {
        return '/'
      }
    })
    // directive
    Vue.directive('acl', {
      bind(el, binding, vnode) {
        if (binding.arg === 'can') {
          if (!binding.value || binding.value === '*') {
            return
          }

          if (Array.isArray(binding.value)) {
            const rulesParticles = binding.value
            for (let i = 0; i < rulesParticles.length; i++) {
              const ruleIndex = rules.findIndex((rule) => binding.value[rulesParticles[i]] === rule.name)
              if (ruleIndex > -1 && rules[ruleIndex].check(null, null)) {
                return
              }
              else {
                el.parentNode.removeChild(el)
              }
            }
          }
          else {
            const ruleIndex = rules.findIndex((rule) => binding.value === rule.name)
            if (ruleIndex > -1 && rules[ruleIndex].check(null, null)) {
              return
            }
            else {
              el.parentNode.removeChild(el)
            }
          }
        }
        else if (binding.arg === 'cannot') {
          if (!binding.value || binding.value === '*') {
            el.parentNode.removeChild(el)
          }

          if (Array.isArray(binding.value)) {
            const rulesParticles = binding.value
            for (let i = 0; i < rulesParticles.length; i++) {
              const ruleIndex = rules.findIndex((rule) => binding.value[rulesParticles[i]] === rule.name)
              if (ruleIndex > -1 && rules[ruleIndex].check(null, null)) {
                el.parentNode.removeChild(el)
              }
              else {
                return
              }
            }
          }
          else {
            const ruleIndex = rules.findIndex((rule) => binding.value === rule.name)
            if (ruleIndex > -1 && rules[ruleIndex].check(null, null)) {
              el.parentNode.removeChild(el)
            }
            else {
              return
            }
          }
        }
      }
    })
    // mixin
    Vue.mixin({
      methods: {
        $can(rule) {
          if (typeof rule === 'boolean') {
            return rule
          }

          if (!rule || rule === '*') {
            return true
          }

          if (Array.isArray(rule)) {
            const rulesParticles = rule
            for (let i = 0; i < rulesParticles.length; i++) {
              const ruleIndex = rules.findIndex((rule) => rule[rulesParticles[i]] === rule.name)
              if (ruleIndex > -1 && rules[ruleIndex].check(null, null)) {
                return true
              }
              else {
                return false
              }
            }
          }
          else {
            const ruleIndex = rules.findIndex((rule) => rule === rule.name)
            if (ruleIndex > -1 && rules[ruleIndex].check(null, null)) {
              return true
            }
            else {
              return false
            }
          }
        },
        $cannot(rule) {
          if (typeof rule === 'boolean') {
            return !rule
          }

          if (!rule || rule === '*') {
            return false
          }

          if (Array.isArray(rule)) {
            const rulesParticles = rule
            for (let i = 0; i < rulesParticles.length; i++) {
              const ruleIndex = rules.findIndex((rule) => rule[rulesParticles[i]] === rule.name)
              if (ruleIndex > -1 && rules[ruleIndex].check(null, null)) {
                return false
              }
              else {
                return true
              }
            }
          }
          else {
            const ruleIndex = rules.findIndex((rule) => rule === rule.name)
            if (ruleIndex > -1 && rules[ruleIndex].check(null, null)) {
              return false
            }
            else {
              return true
            }
          }
        }
      }
    })
  },

  rules(...rules) {

  }
}

export class ACLRule {
  constructor(name, checker, {
    ownRule = null,
    redirect = null
  } = {}) {
    this.name = name
    this.checker = checker
    this.redirect = redirect
    this.ownRule = ownRule
  }

  check(to, from) {
    if (this.checker(to, from)) {
      return true
    }
    else if (this.ownRule && Array.isArray(this.ownRule)) {
      for (let i = 0; i < this.ownRule.length; i++) {
        if (this.ownRule[i].check(to, from)) {
          return true
        }
      }
    }
    else if (this.ownRule) {
      if (this.ownRule.check(to, from)) {
        return true
      }
    }

    return false
  }
}
