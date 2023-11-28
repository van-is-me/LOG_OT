import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import EmployeeInformationView from '../views/EmpInfoView.vue'
import HrEmpManagementView from '../views/HrEmpManagementView.vue'
import PageNotFound from '../views/PageNotFound.vue'
import checkAuth from '../middleware/checkAuth'
import RequestOT from '../views/RequestOTView.vue'
import Exchange from '../views/Exchange.vue'
import requestOff from '../views/RequestOffView.vue'
import department from '../views/DepartmentView.vue'
import MaternityEmployee from '../views/MaternityEmployeeView.vue'
import Dependent from '../views/DependentView.vue'
import AttendanceEmployee from '../views/AttendanceEmployee.vue'
import OvertimeLog from '../views/OvertimeLog.vue'
import employeeView from '../views/EmployeeView.vue'
import PayslipView from '../views/PayslipView.vue'
import EmpInformation from '../views/Employee/Information.vue'
import EmpDegree from '../views/Employee/Degree.vue'
import EmpContract from '../views/Employee/Contract.vue'
import EmpAllowance from '../views/Employee/Allowance.vue'
import LeaveLogPage from '../views/LeaveLogPage.vue'
import EmployeeList from '../views/EmployeeList.vue'
import EmpDepartment from '../views/Employee/Department.vue'
import PaySlipForEmp from '../views/PayslipForEmp.vue'
import EmpSkill from '../views/Employee/Skill.vue'
import AccountView from '../views/AccountView.vue'
import EmpDependant from '../views/Employee/Dependant.vue'
import EmpExperience from '../views/Employee/Experience.vue'
import subsidize from '../views/SubsidizeView.vue'
import position from '../views/PositionView.vue'
import level from '../views/LevelView.vue'
import AttendanceEmployeeList from '../views/AttendanceEmployeeList.vue'
import allowance from '../views/AllowanceView.vue'
import employeeContract from '../views/EmployeeContractView.vue'
import configWorkDay from '../views/ConfigDayView.vue'
import departmentAllowance from '../views/DepartmentAllowanceView.vue'
import permissionDenied from '../views/NotHavePermission.vue'
import JobReport from '../views/JobReport.vue'
import configWifi from '../views/ConfigWifi.vue'
import checkValidRole from '../middleware/checkValidRole'
import coefficient from '../views/CoefficientView.vue'
import annualWorkingDay from '../views/AnnualWorkingDayView.vue'
import attendanceManager from '../views/AttendanceManagerView.vue'
import AcceptRequest from '../views/AcceptRequest.vue'
import ConfirmEmail from '../views/ConfirmEmail.vue'
import LeaveLog from '../views/LeaveLog.vue'
import ChangePassword from '../views/ChangePassword.vue'
import regionalMinimumWage from '../views/RegionalMinimumWage.vue'
import configDefault from '../views/ConfigDefaultView.vue'
import taxIncome from '../views/TaxIncomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // Cuộn lên đầu trang
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Manager'
      },
      beforeEnter: checkValidRole
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: PageNotFound,
      meta: {
        // middleware: checkAuth,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        // middleware: checkAuth,
      }
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: ChangePassword,
      meta: {
        // middleware: checkAuth,
      }
    },
    {
      path: '/hrEmpManagement',
      name: 'hrempmanagement',
      component: HrEmpManagementView,
      meta: {
        // middleware: checkAuth,
        requiredRole: 'Manager'
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/employee',
      name: 'empinfo',
      component: EmployeeInformationView,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Manager'
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/employee-list',
      name: 'employee-list',
      component: EmployeeList,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Manager'

      },
      beforeEnter: checkValidRole
    },
    {
      path: '/maternity-employee',
      name: 'maternity-employee',
      component: MaternityEmployee,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Manager'

      },
      beforeEnter: checkValidRole
    },
    {
      path: '/overtime-log',
      name: 'overtime-log',
      component: OvertimeLog,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Manager'

      },
      beforeEnter: checkValidRole
    },
    {
      path: '/dependent-list',
      name: 'dependent-list',
      component: Dependent,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Manager'

      },
      beforeEnter: checkValidRole
    },
    {
      path: '/request-ot',
      name: 'request-ot',
      component: RequestOT,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Manager'

      },
      beforeEnter: checkValidRole
    },
    {
      path: '/request-off',
      name: 'request-off',
      component: requestOff,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Manager'

      },
      beforeEnter: checkValidRole
    },
    {
      path: '/department',
      name: 'department',
      component: department,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Manager'

      },
      beforeEnter: checkValidRole
    },
    {
      path: '/subsidize',
      name: 'subsidize',
      component: subsidize,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Manager'

      },
      beforeEnter: checkValidRole
    },
    {
      path: '/position',
      name: 'position',
      component: position,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Manager'

      },
      beforeEnter: checkValidRole
    },
    {
      path: '/config-wifi',
      name: 'config-wifi',
      component: configWifi,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Manager'
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/job-report',
      name: 'job-report',
      component: JobReport,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Manager'
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/payslip',
      name: 'payslip',
      component: PayslipView,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Manager'
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/level',
      name: 'level',
      component: level,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Manager'

      },
      beforeEnter: checkValidRole
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Manager'
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/allowance',
      name: 'allowance',
      component: allowance,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Manager'

      },
      beforeEnter: checkValidRole
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: Exchange,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Manager'

      },
      beforeEnter: checkValidRole
    },
    {
      path: '/leavelog-list',
      name: 'leavelog-list',
      component: LeaveLogPage,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Manager'

      },
      beforeEnter: checkValidRole
    },
    {
      path: '/employeeContract',
      name: 'employeeContract',
      component: employeeContract,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Manager'

      },
      beforeEnter: checkValidRole
    },
    {
      path: '/configWorkDay',
      name: 'configWorkDay',
      component: configWorkDay,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Manager'

      },
      beforeEnter: checkValidRole
    },
    {
      path: '/AttendanceEmployee',
      name: 'attendance-employee',
      component: AttendanceEmployee,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Employee'
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/payslip-employee',
      name: 'payslip-employee',
      component: PaySlipForEmp,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Employee'
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/leave-log-emp',
      name: 'leave-log-emp',
      component: LeaveLog,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Employee'
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/request',
      name: 'accept-request',
      component: AcceptRequest,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Employee'
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/attendance-list',
      name: 'attendance-employee-list',
      component: AttendanceEmployeeList,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Employee'
      },
      beforeEnter: checkValidRole
    },
    {
      path: '/ConfirmEmail',
      name: 'confirm-email',
      component: ConfirmEmail,
      meta: {
        // middleware: checkAuth,
        // requiredRole: 'Employee'
      }
    },
    {
      path: '/departmentSubsidize',
      name: 'departmentAllowance',
      component: departmentAllowance,
      meta: {
        middleware: checkAuth,
        requiredRole: 'Manager'

      },
      beforeEnter: checkValidRole
    },
    {
      path: '/permission-denied',
      name: 'permission-denied',
      component: permissionDenied,
      meta: {
        // middleware: checkAuth,
      }
    },
    {
      path: '/coefficient',
      name: 'coefficient',
      component: coefficient,
      meta: {
        middleware: checkAuth
      }
    },
    {
      path: '/annualWorkingDay',
      name: 'annualWorkingDay',
      component: annualWorkingDay,
      meta: {
        middleware: checkAuth
      }
    },
    {
      path: '/attendanceManager',
      name: 'attendanceManager',
      component: attendanceManager,
      meta: {
        middleware: checkAuth
      }
    },
    {
      path: '/regionalMinimumWage',
      name: 'regionalMinimumWage',
      component: regionalMinimumWage,
      meta: {
        middleware: checkAuth
      }
    },
    {
      path: '/configDefault',
      name: 'configDefault',
      component: configDefault,
      meta: {
        middleware: checkAuth
      }
    },
    {
      path: '/configTaxIncome',
      name: 'configTaxIncome',
      component: taxIncome,
      meta: {
        middleware: checkAuth
      }
    },
    {
      path: '/employee-view',
      name: 'employee-view',
      component: employeeView,
      meta: {
        middleware: checkAuth,
        // requiredRole: 'Manager'
      },
      // beforeEnter: checkValidRole,
      children: [
        {
          path: 'emp-information/:username/:id',
          name: 'emp-information',
          component: EmpInformation,
          meta: {
            middleware: checkAuth,
            // requiredRole: 'Manager'
          },
          // beforeEnter: checkValidRole
        },
        {
          path: 'emp-contract/:username/:id',
          name: 'emp-contract',
          component: EmpContract,
          meta: {
            middleware: checkAuth,
            // requiredRole: 'Manager'
          },
          // beforeEnter: checkValidRole
        },
        {
          path: 'emp-degree/:username/:id',
          name: 'emp-degree',
          component: EmpDegree,
          meta: {
            middleware: checkAuth,
            // requiredRole: 'Manager'
          },
          // beforeEnter: checkValidRole
        },
        // {
        //   path: 'emp-allowance/:username/:id',
        //   name: 'emp-allowance',
        //   component: EmpAllowance,
        //   meta: {
        //     middleware: checkAuth,
        //     requiredRole: 'Manager'
        //   },
        //   beforeEnter: checkValidRole
        // },
        {
          path: 'emp-department/:username/:id',
          name: 'emp-department',
          component: EmpDepartment,
          // beforeEnter: checkValidRole,
          meta: {
            middleware: checkAuth,
            // requiredRole: 'Manager'
          },
        },
        {
          path: 'emp-skill/:username/:id',
          name: 'emp-skill',
          component: EmpSkill,
          meta: {
            middleware: checkAuth,
            // requiredRole: 'Manager'
          },
          // beforeEnter: checkValidRole
        },
        {
          path: 'emp-experience/:username/:id',
          name: 'emp-experience',
          component: EmpExperience,
          meta: {
            middleware: checkAuth,
            // requiredRole: 'Manager'
          },
          // beforeEnter: checkValidRole
        },
        {
          path: 'emp-dependant/:username/:id',
          name: 'emp-dependant',
          component: EmpDependant,
          meta: {
            middleware: checkAuth,
            // requiredRole: 'Manager'
          },
          // beforeEnter: checkValidRole
        },
      ]
    },
  ]
})

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters)
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
}

const defaultTitle = 'LOG OT'
router.beforeEach((to, from, next) => {
  document.title = to.name.toUpperCase() || defaultTitle
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware]

    const context = {
      from,
      next,
      router,
      to,
    }
    const nextMiddleware = nextFactory(context, middleware, 1)

    return middleware[0]({ ...context, next: nextMiddleware })
  }

  return next()
})


export default router
