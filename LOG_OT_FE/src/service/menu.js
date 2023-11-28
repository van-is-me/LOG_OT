export default class menu {
    static menuList() {
        return [
            {
                id: 1,
                name: 'menu',
                items: [
                    {
                        iconName: 'dashboardIcon',
                        itemName: 'Quản lý',
                        isShow: false,
                        isShowExpand: false,
                        children: [
                            { childName: 'Hợp đồng', routeName: 'employeeContract' },
                            { childName: 'Nhân Viên', routeName: 'employee-list' },
                            { childName: 'Nghỉ phép', routeName: 'leavelog-list' },
                            { childName: 'Phòng ban', routeName: 'department' },
                            { childName: 'Phụ cấp', routeName: 'allowance' },
                            { childName: 'Phụ cấp theo phòng ban', routeName: 'departmentAllowance' },
                            { childName: 'Phụ thuộc', routeName: 'dependent-list' },
                            { childName: 'Quản lý chấm công', routeName: 'attendanceManager' },
                            { childName: 'Quản lý Lương', routeName: 'payslip' },
                            { childName: 'Thai Sản', routeName: 'maternity-employee' },
                            { childName: 'Tài khoản quản lý', routeName: 'account' },
                            { childName: 'Tăng ca', routeName: 'overtime-log' },
                            { childName: 'Trình độ', routeName: 'level' },
                            { childName: 'Trợ cấp theo phòng ban', routeName: 'subsidize' },
                            { childName: 'Vị trí', routeName: 'position' }
                        ]
                    },
                    {
                        iconName: 'managementItem',
                        itemName: 'Cấu hình',
                        isShow: false,
                        isShowExpand: false,
                        children: [
                            { childName: 'Ca làm', routeName: 'configWorkDay' },
                            { childName: 'Hệ số lương', routeName: 'coefficient' },
                            { childName: 'Mặc định', routeName: 'configDefault' },
                            { childName: 'Mức lương tối thiểu theo vùng', routeName: 'regionalMinimumWage' },
                            { childName: 'Ngày làm việc', routeName: 'annualWorkingDay' },
                            { childName: 'Thuế thu nhập', routeName: 'configTaxIncome' },
                            { childName: 'Trao đổi', routeName: 'exchange' },
                            { childName: 'Wifi', routeName: 'config-wifi' },
                        ]
                    },
                    {
                        iconName: 'dashboardIcon',
                        itemName: 'Báo cáo',
                        isShow: false,
                        isShowExpand: false,
                        children: [
                            {
                                childName: 'Công việc',
                                routeName: 'job-report',
                            },
                        ]
                    },
                ]
            }
        ]
    }

    static menuListEmp() {
        return [
            {
                id: 1,
                name: 'menu',
                items: [
                    {
                        iconName: 'dashboardIcon',
                        itemName: 'Quản lý',
                        isShow: true,
                        isShowExpand: false,
                        children: [
                            {
                                childName: 'Bảng lương',
                                routeName: 'payslip-employee'
                            },
                            {
                                childName: 'Chấm công',
                                routeName: 'attendance-employee'
                            },
                            {
                                childName: 'Danh sách chấm công',
                                routeName: 'attendance-employee-list'
                            },
                            {
                                childName: 'Xin nghỉ',
                                routeName: 'leave-log-emp'
                            },
                            {
                                childName: 'Yêu cầu tăng ca',
                                routeName: 'accept-request'
                            },
                        ]
                    }
                ]
            }
        ]
    }

    static profileMenu() {
        return [
            {
                name: 'Thay đổi mật khẩu',
                routeName: 'changePassword'
            },
            // {
            //     name: 'payroll',
            //     routeName: 'payroll',
            // },
            // {
            //     name: 'request ot',
            //     routeName: 'request-ot',
            // },
            // {
            //     name: 'request off',
            //     routeName: 'request-off',
            // },
            // {
            //     name: 'Danh sách nhân viên',
            //     routeName: 'hrempmanagement',
            // },
            // {
            //     name: 'Employee View',
            //     routeName: 'emp-information',
            // }       
        ]
    }

    static profileEmpMenu() {
        return [
            {
                name: 'Thông tin',
                routeName: 'emp-information',
            },
            {
                name: 'Bằng cấp',
                routeName: 'emp-degree',
            },
            // {
            //     name: 'allowance',
            //     routeName: 'emp-allowance',
            // },
            {
                name: 'Phòng ban',
                routeName: 'emp-department',
            },
            // {
            //     name: 'Skill',
            //     routeName: 'emp-skill',
            // },
            // {
            //     name: 'experience',
            //     routeName: 'emp-experience',
            // },
            {
                name: 'Hợp đồng',
                routeName: 'emp-contract',
            },
            {
                name: 'Phụ thuộc',
                routeName: 'emp-dependant',
            }
        ]
    }
}