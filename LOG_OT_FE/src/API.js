import axios from "axios"

export default class API {
    // static BASE_URL_V1 = 'https://localhost:5001'
    static BASE_URL_V1 = 'https://hrmanagerfpt.azurewebsites.net/'
    // static FE_URL = 'http://localhost:5173/'
    static FE_URL = 'https://hrm-production.netlify.app/'
    static ALLOWANCE = 'allowance'
    static EMPLOYEE = 'Employee'
    static POSITION = 'Position'
    static MATERNITYEMPLOYEE = "MaternityEmployee"
    static OVERTIMELOG = 'OvertimeLog'
    static DEPENDENT = 'Dependent'
    static CONTRACT = 'EmployeeContract'


    //dashboard
    static getDashboard() {
        return axios.get(`${this.BASE_URL_V1}/api/Dashboard`)
    }
    // auth
    static login(loginData) {
        return axios.post(`${this.BASE_URL_V1}/login`, loginData, {
            headers: {
                'Reference': this.FE_URL
            }
        })
    }
    static confirmEmail(id, code) {
        return axios.get(`${this.BASE_URL_V1}/confirmEmail?userId=${id}&code=${code}`)
    }
    static lockAcc(id) {
        return axios.put(`${this.BASE_URL_V1}/Employee/LockAccount?userId=${id}`)
    }
    static unlockAcc(id) {
        return axios.put(`${this.BASE_URL_V1}/Employee/UnlockAccount?userId=${id}`)
    }

    //account
    static getListAccount(page) {
        return axios.get(`${this.BASE_URL_V1}/GetListManagerAccount?pg=${page}`)
    }
    static createAccount(data) {
        return axios.post(`${this.BASE_URL_V1}/CreateManagerAccount`, data)
    }

    //change pass
    static ChangePassword(data) {
        return axios.put(`${this.BASE_URL_V1}/Account/ChangePassword`, data)
    }

    // department get List
    static getListDepartment() {
        return axios.get(`${this.BASE_URL_V1}/Department`)
    }

    static createDepartment(data) {
        return axios.post(`${this.BASE_URL_V1}/Department/Create`, data)
    }

    static updateDepartment(data) {
        return axios.put(`${this.BASE_URL_V1}/Department/Update`, data)
    }

    static deleteDepartment(id) {
        return axios.delete(`${this.BASE_URL_V1}/Department/Delete?id=${id}`)
    }

    // allowance
    static getListAllowance(page) {
        return axios.get(`${this.BASE_URL_V1}/${this.ALLOWANCE}/GetListAllowance/${page}`)
    }

    //dependent
    static getDependentList(page) {
        return axios.get(`${this.BASE_URL_V1}/${this.DEPENDENT}/GetListDependent/${page}`)
    }
    static createDependent(data) {
        return axios.post(`${this.BASE_URL_V1}/${this.DEPENDENT}/CreateDependent`, data)
    }
    static updateDependent(data) {
        return axios.put(`${this.BASE_URL_V1}/${this.DEPENDENT}/Update`, data)
    }
    static deleteDependent(id) {
        return axios.delete(`${this.BASE_URL_V1}/${this.DEPENDENT}/DeleteDegree/${id}`)
    }

    static getDependentListByUser(id) {
        return axios.get(`${this.BASE_URL_V1}/Dependent/GetListDependantByUser?userId=${id}&pg=1`)
    }

    //payslip
    static getListPayslip(page) {
        return axios.get(`${this.BASE_URL_V1}/Payslip/GetListPayslip?pg=${page}`)
    }
    static createPayslip() {
        return axios.post(`${this.BASE_URL_V1}/Payslip/Create`)
    }
    static getPayslipMore(userId, month, year) {
        return axios.get(`${this.BASE_URL_V1}/Payslip/GetListPayslipByUserOrMonthOrBoth?userId=${userId}&month=${month}&year=${year}`)
    }
    static getDetailPayslip(id) {
        return axios.get(`${this.BASE_URL_V1}/Payslip/GetDetailPayslip?id=${id}`)
    }

    //api of employee
    static getRuleAttendance() { }
    static getAttendanceEmployeeList(page) {
        return axios.get(`${this.BASE_URL_V1}/Emp/AttendanceEmployee?pg=${page}`)
    }
    static getAttendanceEmployeeListFilter(page, FromDate, ToDate) {
        return axios.get(`${this.BASE_URL_V1}/Emp/AttendanceEmployee/Filter?pg=${page}&FromDate=${FromDate}&ToDate=${ToDate}`)
    }
    static createAttendance() {
        return axios.post(`${this.BASE_URL_V1}/Emp/AttendanceEmployee/Create`)
    }

    //Exchange
    static getListExchange() {
        return axios.get(`${this.BASE_URL_V1}/Config/Exchange`)
    }
    static updateExchange(data) {
        return axios.put(`${this.BASE_URL_V1}/Config/UpdateExchange`, data)
    }

    //contract
    static getContractList(page) {
        return axios.get(`${this.BASE_URL_V1}/${this.CONTRACT}/GetList?pg=${page}`)
    }
    static createEmployeeContract(data) {
        return axios.post(`${this.BASE_URL_V1}/${this.CONTRACT}/Create`, data)
    }

    static getListEmployeeContractByUsername(username) {
        return axios.get(`${this.BASE_URL_V1}/EmployeeContract/GetListByEmployee?username=${username}&pg=1`)
    }

    //employee
    static getListEmployee(page = 1) {
        return axios.get(`${this.BASE_URL_V1}/${this.EMPLOYEE}?pg=${page}`)
    }
    static createEmployee(data) {
        return axios.post(`${this.BASE_URL_V1}/${this.EMPLOYEE}/Create`, data)
    }
    static updateEmployee(data) {
        return axios.put(`${this.BASE_URL_V1}/${this.EMPLOYEE}/update`, data)
    }
    static getDetailEmployee(username) {
        return axios.get(`${this.BASE_URL_V1}/${this.EMPLOYEE}/GetDetailEmployee?username=${username}`)
    }
    static updateEmail(data) {
        return axios.put(`${this.BASE_URL_V1}/Employee/UpdateEmail`, data)
    }
    static quit(id) {
        return axios.put(`${this.BASE_URL_V1}/Employee/Quit?userId=${id}`)
    }
    static updateMaternity(id) {
        return axios.put(`${this.BASE_URL_V1}/Employee/UpdateMaternity?userId=${id}`)
    }
    static getInfo() {
        return axios.get(`${this.BASE_URL_V1}/Emp/Infor`)
    }
    static getDepartmentForEmp() {
        return axios.get(`${this.BASE_URL_V1}/Emp/Department`)
    }
    static getListContractForEmp() {
        return axios.get(`${this.BASE_URL_V1}/Emp/ListContract`)
    }
    static getDependanceForEmp() {
        return axios.get(`${this.BASE_URL_V1}/Emp/ListDependent`)
    }
    static searchEmployee(name, page) {
        return axios.get(`${this.BASE_URL_V1}/Employee/Search?Keyword=${name}&pg=${page}`)
    }


    // Position
    static getListPosition() {
        return axios.get(`${this.BASE_URL_V1}/Position`)
    }

    static createPosition(data) {
        return axios.post(`${this.BASE_URL_V1}/Position/Create`, data)
    }

    static updatePosition(data) {
        return axios.put(`${this.BASE_URL_V1}/Position/Update`, data)
    }

    static deletePosition(id) {
        return axios.delete(`${this.BASE_URL_V1}/Position/Delete?id=${id}`)
    }

    //MaternityEmployee
    static getMaternityEmployeeList(page) {
        return axios.get(`${this.BASE_URL_V1}/${this.MATERNITYEMPLOYEE}/GetListMaternityEmployee/${page}`)
    }
    static createMaternityEmployee(data) {
        return axios.post(`${this.BASE_URL_V1}/${this.MATERNITYEMPLOYEE}/CreateMaternityEmployee`, data)
    }
    static updateMaternityEmployee(data) {
        return axios.put(`${this.BASE_URL_V1}/${this.MATERNITYEMPLOYEE}/UpdateMaternityEmployee`, data)
    }
    static deleteMaternityEmployee(id) {
        return axios.delete(`${this.BASE_URL_V1}/${this.MATERNITYEMPLOYEE}/DeleteMaternityEmployee/${id}`)
    }


    //OvertimeLog
    static getOverTimeLogList(page) {
        return axios.get(`${this.BASE_URL_V1}/${this.OVERTIMELOG}/GetOvertimeLog?pg=${page}`)
    }
    static createOTLog(data) {
        return axios.post(`${this.BASE_URL_V1}/${this.OVERTIMELOG}/CreateOvertimeLog`, data)
    }
    // static updateOTLog(idOTRequest, status, cancelReason) {
    //     return axios.put(`${this.BASE_URL_V1}/${this.OVERTIMELOG}/UpdateStatusOvertimeLogRequest?idOTRequest=${idOTRequest}&status=${status}&cancelReason=${cancelReason}`)
    // }
    static deleteLogOT(id) {
        return axios.put(`${this.BASE_URL_V1}/${this.OVERTIMELOG}/DeleteOvertimeLog/${id}`)
    }


    // Level
    static getListLevel() {
        return axios.get(`${this.BASE_URL_V1}/Level/GetLevel?pg=1`)
    }

    static createLevel(data) {
        return axios.post(`${this.BASE_URL_V1}/Level/CreateLevel`, data)
    }

    static deleteLevel(id) {
        return axios.delete(`${this.BASE_URL_V1}/Level/Delete/${id}`)
    }

    static updateLevel(id, data) {
        return axios.put(`${this.BASE_URL_V1}/Level/Update/${id}`, data);
    }

    //enums

    static workStatus() {
        return axios.get(`${this.BASE_URL_V1}/api/Enum/WorkStatus`)
    }

    static salaryType() {
        return axios.get(`${this.BASE_URL_V1}/api/Enum/SalaryType`)
    }
    static contractType() {
        return axios.get(`${this.BASE_URL_V1}/api/Enum/ContractType`)
    }
    static insuranceType() {
        return axios.get(`${this.BASE_URL_V1}/api/Enum/InsuranceType`)
    }
    static logStatus() {
        return axios.get(`${this.BASE_URL_V1}/api/Enum/LogStatus`)
    }

    static getListEmployeeContract(page) {
        return axios.get(`${this.BASE_URL_V1}/EmployeeContract/GetList?pg=${page}`)
    }

    static createEmployeeContract(data) {
        return axios.post(`${this.BASE_URL_V1}/EmployeeContract/Create`, data)
    }

    static getListEmployeeContractStatus() {
        return axios.get(`${this.BASE_URL_V1}/api/Enum/EmployeeContractStatus`)
    }

    static getListSalaryType() {
        return axios.get(`${this.BASE_URL_V1}/api/Enum/SalaryType`)
    }

    static getListContractType() {
        return axios.get(`${this.BASE_URL_V1}/api/Enum/ContractType`)
    }

    static getListInsuranceType() {
        return axios.get(`${this.BASE_URL_V1}/api/Enum/InsuranceType`)
    }

    static getListEmployeeContractStatus() {
        return axios.get(`${this.BASE_URL_V1}/api/Enum/EmployeeContractStatus`)
    }
    static getLeaveShift() {
        return axios.get(`${this.BASE_URL_V1}/api/Enum/LeaveShift`)
    }

    static updateEmployeeContract(data) {
        return axios.put(`${this.BASE_URL_V1}/EmployeeContract/Update`, data)
    }

    static deleteEmployeeContract(id) {
        return axios.delete(`${this.BASE_URL_V1}/EmployeeContract/Delete/${id}`)
    }

    //allowance
    static getListAllowance(page) {
        return axios.get(`${this.BASE_URL_V1}/Allowance/GetListAllowance/${page}`)
    }

    static getAllListAllowance() {
        return axios.get(`${this.BASE_URL_V1}/Allowance/GetAll`)
    }

    static createAllowance(data) {
        return axios.post(`${this.BASE_URL_V1}/Allowance/CreateAllowance`, data)
    }

    static deleteAllowance(id) {
        return axios.delete(`${this.BASE_URL_V1}/Allowance/DeleteAllowance/${id}`)
    }

    static updateAllowance(data) {
        return axios.put(`${this.BASE_URL_V1}/Allowance/UpdateAllowance`, data)
    }

    static getListAllowanceType() {
        return axios.get(`${this.BASE_URL_V1}/api/Enum/AllowanceType`)
    }

    //config Workday
    static getListConfigDay() {
        return axios.get(`${this.BASE_URL_V1}/Config/WorkDay`)
    }

    static getListShiftType() {
        return axios.get(`${this.BASE_URL_V1}/api/Enum/ShiftType`)
    }

    static getListAcceptanceType() {
        return axios.get(`${this.BASE_URL_V1}/api/Enum/acceptanceType`)
    }

    static updateConfigDay(data) {
        return axios.post(`${this.BASE_URL_V1}/Config/WorkDay/Update`, data)
    }

    static getListRegionalMinimumWage() {
        return axios.get(`${this.BASE_URL_V1}/Config/RegionalMinimumWage`)
    }

    static getListRegionType() {
        return axios.get(`${this.BASE_URL_V1}/api/Enum/RegionType`)
    }

    static updateRegionalMinimumWage(data) {
        return axios.put(`${this.BASE_URL_V1}/Config/RegionalMinimumWage/Update`, data)
    }

    static exportExcelFileExchange() {
        // return axios.get(`${this.BASE_URL_V1}/Config/ExportExcelFileExchange`)
        return axios.get('https://drive.usercontent.google.com/uc?id=1AnnC-pzJP-Oxvew2X27FGcl-BK7GCYoT&authuser=1&export=download')
    }

    static exportExcelFileTaxIncome() {
        return axios.get(`${this.BASE_URL_V1}/Config/ExportExcelFileTaxIncome`)
    }

    //config default

    static getConfigDefault() {
        return axios.get(`${this.BASE_URL_V1}/Config/Default`)
    }

    static updateConfigDefault(data) {
        return axios.put(`${this.BASE_URL_V1}/Config/Default/Update`, data)
    }

    //taxIncome

    static getConfigTaxIncome() {
        return axios.get(`${this.BASE_URL_V1}/Config/TaxIncome`)
    }
    static updateTaxIncome(data) {
        return axios.put(`${this.BASE_URL_V1}/Config/UpdateTaxIncome`, data)
    }


    //config wifi
    static getAddressConnecting() {
        return axios.get(`${this.BASE_URL_V1}/ConfigWifi/GetAddressConnecting`)
    }
    static getListWifi(page = 1) {
        return axios.get(`${this.BASE_URL_V1}/ConfigWifi/GetListNetWork/page?page=${page}`)
    }
    static createWifi(name, ip) {
        return axios.post(`${this.BASE_URL_V1}/ConfigWifi/CreateNetwork?ip=${ip}&name=${name}`)
    }
    static updateWifi(id, name, ip) {
        return axios.put(`${this.BASE_URL_V1}/ConfigWifi/UpdateNetwork?name=${name}&ip=${ip}&id=${id}`)
    }
    static deleteWifi(id) {
        return axios.delete(`${this.BASE_URL_V1}/ConfigWifi/DeleteNetwork/${id}`)
    }
    static getOnlyIP() {
        return axios.get('https://api-bdc.net/data/client-info')
    }

    //job report
    static getListJobReport(page) {
        return axios.get(`${this.BASE_URL_V1}/JobReport/GetListJobReport/${page}`)
    }
    static getDetailJobReport(id) {
        return axios.get(`${this.BASE_URL_V1}/JobReport/GetJobReportDetailById/${id}`)
    }
    static exportFileJobReport(id) {
        return axios.get(`${this.BASE_URL_V1}/JobReport/ExportExcelFile/${id}`)
    }

    //departmentallowance
    static getListDepartmentAllowance() {
        return axios.get(`${this.BASE_URL_V1}/DepartmentAllowance`)
    }

    static createDepartmentSubsidize(data) {
        return axios.post(`${this.BASE_URL_V1}/DepartmentAllowance/Create`, data)
    }

    static updateDepartmentAllowance(data) {
        return axios.put(`${this.BASE_URL_V1}/DepartmentAllowance/Update`, data)
    }

    static deleteDepartmentAllowance(id) {
        return axios.delete(`${this.BASE_URL_V1}/DepartmentAllowance/Delete?id=${id}`)
    }

    //subsidize
    static getListSubsidize() {
        return axios.get(`${this.BASE_URL_V1}/Subsidize`)
    }

    static createSubsidize(data) {
        return axios.post(`${this.BASE_URL_V1}/Subsidize/Create`, data)
    }

    static updateSubsidize(data) {
        return axios.put(`${this.BASE_URL_V1}/Subsidize/Update`, data)
    }

    static deleteSubsidize(id) {
        return axios.delete(`${this.BASE_URL_V1}/Subsidize/Delete?id=${id}`)
    }
    //Coefficient
    static getListCoefficient() {
        return axios.get(`${this.BASE_URL_V1}/Coefficient`)
    }

    static updateCoefficient(data) {
        return axios.post(`${this.BASE_URL_V1}/Coefficient/Update`, data)
    }

    //annual
    static getListAnnual(page) {
        return axios.get(`${this.BASE_URL_V1}/Annual?pg=${page}`)
    }

    static createAnnual(data) {
        return axios.post(`${this.BASE_URL_V1}/Annual/Create`, data)
    }

    static updateAnnual(data) {
        return axios.put(`${this.BASE_URL_V1}/Annual/Update`, data)
    }

    static deleteAnnual(id) {
        return axios.delete(`${this.BASE_URL_V1}/Annual/Delete?id=${id}`)
    }
    static importExcelAnnual(data) {
        return axios.post(`${this.BASE_URL_V1}/Annual/ImportExcel`, data)
    }

    //attendace manager
    static getAttendanceManager(page) {
        return axios.get(`${this.BASE_URL_V1}/Attendance?pg=${page}`)
    }

    static getAttendanceByUsername(data) {
        return axios.get(`${this.BASE_URL_V1}/Attendance/GetListByUser?username=${data}`)
    }

    static getAttendanceByFilter(fromDate, toDate) {
        return axios.get(`${this.BASE_URL_V1}/Attendance/Filter?FromDate=${fromDate}&ToDate=${toDate}&pg=1`)
    }

    //api for employee detail
    static getListDegreeByUserId(id, page) {
        return axios.get(`${this.BASE_URL_V1}/Degree/GetListByUserId/${page}?userId=${id}`)
    }
    static getDepartmentByUser(userName) {
        return axios.get(`${this.BASE_URL_V1}/Department/GetByUser?Username=${userName}`)
    }
    static getSkillByEmployeeId(id) {
        return axios.get(`${this.BASE_URL_V1}/SkillEmployee/GetSkillEmployeeId/${id}`)
    }
    static getRegulations() {
        return axios.get(`${this.BASE_URL_V1}/Emp/AttendanceEmployee/AttendantRegulations`)
    }
    static getListCurrentDay() {
        return axios.get(`${this.BASE_URL_V1}/Emp/AttendanceEmployee/GetAttendanceCurrentDay`)
    }
    static chamCong() {
        return axios.get(`${this.BASE_URL_V1}/Emp/AttendanceEmployee/Create`)
    }
    static chamCongV2(ip) {
        return axios.get(`${this.BASE_URL_V1}/Emp/AttendanceEmployee/CreateAttendanceForMobileOnly?ip=${ip}`)
    }
    static getOTLogByEmp(page) {
        return axios.get(`${this.BASE_URL_V1}/Emp/GetOvertimeLog?page=${page}`)
    }
    static updateStatusOTLogByEmp(data) {
        return axios.put(`${this.BASE_URL_V1}/Emp/UpdateStatusOvertimeLogRequest`, data)
    }
    static getLeaveLogList(page) {
        return axios.get(`${this.BASE_URL_V1}/Emp/LeaveLog?pg=${page}`)
    }
    static createLeaveLog(data) {
        return axios.post(`${this.BASE_URL_V1}/Emp/CreateLeaveLog`, data)
    }
    static deleteLeaveLog(id) {
        return axios.put(`${this.BASE_URL_V1}/Emp/DeleteLeaveLog?id=${id}`)
    }
    static getPayslipForEmp(page) {
        return axios.get(`${this.BASE_URL_V1}/Emp/GetListPayslip?pg=${page}`)
    }
    static getPayslipDetailForEmp(id) {
        return axios.get(`${this.BASE_URL_V1}/Emp/GetDetailPayslip?id=${id}`)
    }
    static createDependentForEmp(data) {
        return axios.post(`${this.BASE_URL_V1}/Emp/DependentCreate`, data)
    }

    //leavelog
    static getListLeaveLog(page) {
        return axios.get(`${this.BASE_URL_V1}/LeaveLog/GetLeaveLog?page=${page}`)
    }
    static updateStatusLeaveLog(id, userId, sts, reason) {
        return axios.put(`${this.BASE_URL_V1}/LeaveLog/UpdateStatusLeaveLogRequest/${id}?userId=${userId}&status=${sts}&cancelReason=${reason}`)
    }

    //noti
    static getNotification(page = 1) {
        return axios.get(`${this.BASE_URL_V1}/Notification/GetNotificationByUserId?page=${page}`)
    }
    static checkIfHaveNoti() {
        return axios.get(`${this.BASE_URL_V1}/Notification/IsHaveNotificate`)
    }
    static getNotiById(id) {
        return axios.get(`${this.BASE_URL_V1}/Notification/GetNotificationById?id=${id}`)
    }
}   