import { Actions } from 'react-native-router-flux';

export const HOME_ACT = 1;
export const PRODUCTS_ACT = 2;
export const CATEGORY_ACT = 3;
export const NEW_CATEGORY_ACT = 4;
export const SEARCH_CATEGORY_ACT = 5;
export const PRODUCT_LIST_ACT = 6;
export const NEW_CARGO_TYPE_ACT = 7;
export const LIST_CARGO_TYPE_ACT = 8;
export const REPORT_INVENTORY_ACT = 9;
export const ADVICE_PRODUCT_MUST_IMPORT_ACT = 10;
export const SALE_BY_PRODUCT = 11;
export const ADVICE_PRODUCT_MUST_PROCEDURE_ACT = 12;

export const SALE_ORDER_ACT = 13;
export const NEW_SALE_ORDER_ACT = 14;
export const SALE_ORDER_RETURNING_ACT = 15;
export const SEARCH_SALE_ORDER_ACT = 16;
export const NEW_ORDER_TYPE_ACT = 17;

export const CUSTOMERS_ACT = 18;
export const NEW_CUSTOMER_ACT = 19;
export const CUSTOMER_LIST_ACT = 20;
export const CUSTOMER_DEBT_ACT = 21;
export const SALE_BY_CUSTOMER_ACT = 22;

export const RECEIPTS_ACT = 23;
export const NEW_RECEIPT_ACT = 24;
export const SEARCH_RECEIPT_ACT = 25;
export const EDIT_RECEIPT_ACT = 26;

export const PAYMENT_ACT = 27;
export const NEW_PAYMENT_TYPE_ACT = 28;
export const SALARY_PAY_ACT = 29;
export const RENTAL_WAREHOUSE_ACT = 30;
export const INTERESTING_PAY_ACT = 31;
export const OTHER_PAY_ACT = 32;

export const SUPPLIER_ORDER_ACT = 33;
export const NEW_SUPPLIER_ORDER_ACT = 34;
export const SUPPLIER_RETURNNING_ACT = 35;
export const SEARCH_SUPPLIER_ORDER_ACT = 36;
export const SUPPLIER_ORDER_REPORT_ACT = 37;

export const SUPPLIER_ACT = 38;
export const SEARCH_SUPPLIER_ACT = 39;
export const NEW_SUPPLIER_ACT = 40;
export const SUPPLIER_DEPT_ACT = 41;
export const SALE_BY_SUPPLIER = 42;

export const RESEARCH_ACT = 43;
export const NEW_RESEARCH_ACT = 44;
export const COST_TEMP_ACT = 45;
export const SEARCH_RESEARCH_ACT = 46;
export const TRANSFER_RESEARCH_ACT = 47;
export const REPORT_RESEARCH_ACT = 48;
export const GENERAL_REPORT_RESEARCH_ACT = 49;

export const MANUFACTURER_ACT = 50;
export const MANUFACTURE_COMMAND_ACT = 51;
export const SEARCH_MANUFACTURE_COMMAND_ACT = 52;
export const RECYCLE_COMMAND_ACT = 53;
export const GENERAL_REPORT_MANUFACTURE_ACT = 54;

export const HUMAN_ACT = 55;
export const NEW_DEPARTMENT_ACT = 56;
export const SEARCH_DEPARTMENT_ACT = 57;
export const NEW_USER_ACT = 58;
export const SEARCH_USER_ACT = 59;
export const JOB_TRANSFER_ACT = 60;
export const PERMITION_ACT = 61;

export const REPORT_ACT = 62;
export const SALE_REPORT_ACT = 63;
export const TEMP_INCOME_REPORT_ACT = 64;
export const NET_INCOME_REPORT_ACT = 65;
export const COST_REPORT_ACT = 66;
export const PRODUCTION_COST_REPORT_ACT = 67;

export const SYSTEM_ACT = 68;
export const COMPANY_INFOR_ACT = 69;
export const MENU_ACT = 70;

export const NEW_PRODUCT_ACT = 71;
export const SEARCH_PRODUCT_ACT = 72;

export const NEW_CUSTOMER_GROUP_ACT = 73;
export const SEARCH_CUSTOMER_GROUP_ACT = 74;
export const NEW_SUPPLIER_GROUP_ACT = 75;
export const SEARCH_SUPPLIER_GROUP_ACT = 76;

export const getActionForMenus = (menu) => {
    switch (menu) {
        case HOME_ACT:
            return Actions.Home();
        case PRODUCTS_ACT:
            return null;
        case CATEGORY_ACT:
            return Actions.categoryList();
        case NEW_CATEGORY_ACT:
            return Actions.categoryNew();
        case SEARCH_CATEGORY_ACT:
            return Actions.productList();
        case PRODUCT_LIST_ACT:
            return Actions.productList();
        case NEW_CARGO_TYPE_ACT:
            return Actions.cargoNew();
        case LIST_CARGO_TYPE_ACT:
            return Actions.cargoList();
        case REPORT_INVENTORY_ACT:
            return Actions.reportInventory();
        case ADVICE_PRODUCT_MUST_IMPORT_ACT:
            return Actions.adviceProductMustImport();
        case SALE_BY_PRODUCT:
            return Actions.reportSaleByProduct();
        case ADVICE_PRODUCT_MUST_PROCEDURE_ACT:
            return Actions.adviceProductMustProcedure();

        case NEW_PRODUCT_ACT:
            return Actions.ProductNew();
        case SEARCH_PRODUCT_ACT:
            return Actions.productList();


        case SALE_ORDER_ACT:
            return null;
        case NEW_SALE_ORDER_ACT:
            return Actions.newSaleOrder();
        case SALE_ORDER_RETURNING_ACT:
            return Actions.saleOrderReturnning();
        case SEARCH_SALE_ORDER_ACT:
            return Actions.searchSaleOrder();
        case NEW_ORDER_TYPE_ACT:
            return Actions.newOrderType();

        case CUSTOMERS_ACT:
            return null;
        case NEW_CUSTOMER_ACT:
            return Actions.customerNew();
        case CUSTOMER_LIST_ACT:
            return Actions.customersList();
        case CUSTOMER_DEBT_ACT:
            return Actions.customerDebt();
        case SALE_BY_CUSTOMER_ACT:
            return Actions.reportSaleByCustomer();
        case NEW_CUSTOMER_GROUP_ACT:
            return Actions.customerGroupNew();
        case SEARCH_CUSTOMER_GROUP_ACT:
            return Actions.customerGroupSearch();

        case RECEIPTS_ACT:
            return null;
        case NEW_RECEIPT_ACT:
            return Actions.newReceiptCustomer();
        case EDIT_RECEIPT_ACT:
            return Actions.editReceiptCustomer();
        case SEARCH_RECEIPT_ACT:
            return Actions.indexReceiptCustomer();
            
        case SALARY_PAY_ACT:
            return Actions.newSalaryReceipt();
        case RENTAL_WAREHOUSE_ACT:
            return Actions.newRentalWarehouseReceipt();
        case INTERESTING_PAY_ACT:
            return Actions.newInterestingReceipt();
        case OTHER_PAY_ACT:
            return Actions.newOtherReceipt();

        case SUPPLIER_ORDER_ACT:
            return null;
        case NEW_SUPPLIER_ORDER_ACT:
            return Actions.newSupplierOrder();
        case SUPPLIER_RETURNNING_ACT:
            return Actions.newSupplierOrderReturnning();
        case SEARCH_SUPPLIER_ORDER_ACT:
            return Actions.searchSupplierOrder();
        case SUPPLIER_ORDER_REPORT_ACT:
            return Actions.reportSupplierOrder();

        case SUPPLIER_ACT:
            return null;
        case SEARCH_SUPPLIER_ACT:
            return Actions.searchSupplier();
        case NEW_SUPPLIER_ACT:
            return Actions.newSupplier();
        case SUPPLIER_DEPT_ACT:
            return Actions.supplierDept();
        case SALE_BY_SUPPLIER:
            return Actions.reportSaleBySupplier();
        case NEW_SUPPLIER_GROUP_ACT:
            return Actions.newSupplierGroup();
        case SEARCH_SUPPLIER_GROUP_ACT:
            return Actions.searchSupplierGroup();

        case RESEARCH_ACT:
            return null;
        case NEW_RESEARCH_ACT:
            return Actions.newResearch();
        case COST_TEMP_ACT:
            return Actions.reportCostTemp();
        case SEARCH_RESEARCH_ACT:
            return Actions.searchResearch();
        case TRANSFER_RESEARCH_ACT:
            return Actions.transferResearch();
        case REPORT_RESEARCH_ACT:
            return Actions.reportResearch();
        case GENERAL_REPORT_RESEARCH_ACT:
            return Actions.generalReportResearch();

        case MANUFACTURER_ACT:
            return null;
        case MANUFACTURE_COMMAND_ACT:
            return Actions.newCommandProduction();
        case SEARCH_MANUFACTURE_COMMAND_ACT:
            return Actions.searchCommandProduction();
        case RECYCLE_COMMAND_ACT:
            return Actions.newRecycleCommand();
        case GENERAL_REPORT_MANUFACTURE_ACT:
            return Actions.generalReportProduction();

        case HUMAN_ACT:
            return null;
        case NEW_DEPARTMENT_ACT:
            return Actions.newDepartment();
        case SEARCH_DEPARTMENT_ACT:
            return Actions.searchDepartment();
        case NEW_USER_ACT:
            return Actions.newuser();
        case SEARCH_USER_ACT:
            return Actions.searchUser();
        case JOB_TRANSFER_ACT:
            return Actions.jobTransfer();
        case PERMITION_ACT:
            return Actions.permittion();

        case REPORT_ACT:
            return null;
        case SALE_REPORT_ACT:
            return Actions.reportSaleOrder();
        case TEMP_INCOME_REPORT_ACT:
            return Actions.reportTempIncome();
        case NET_INCOME_REPORT_ACT:
            return Actions.reportNetIncome();
        case COST_REPORT_ACT:
            return Actions.reportCost();
        case PRODUCTION_COST_REPORT_ACT:
            return Actions.reportProducttionCost();

        case SYSTEM_ACT:
            return null;
        case COMPANY_INFOR_ACT:
            return Actions.changeCompanyInfor();
        case MENU_ACT:
            return Actions.changeMenuPermition();

        default:
            return nnull;
    }
};
