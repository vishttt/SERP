import Expo from 'expo';
import Communications from 'react-native-communications';
import {  formatMoney, formatNumber, unformat } from '../utils/format';
export default Invoice = (
    customerName,
    id,
    date,
    total,
    totalIncludeVat,
    vat,
    oldDebt,
    pay,
    newDebt,
    OrderDetail
) => {
    let vatContent = '';
    if(vat > 0) {
        vatContent = `
        <tr>
            <th width="40%"></th>
            <td width="30%"><span>VAT</span></td>
            <td width="30%"><span></span><span>${formatNumber(vat)}</span></td>
        </tr>
        <tr>
            <th width="40%"></th>
            <td width="30%"><span>Tổng tiền (gồm vat)</span></td>
            <td width="30%"><span></span><span>${formatNumber(totalIncludeVat)}</span></td>
        </tr>
    `
    }
    let htmlOrderDetail = '';
    OrderDetail.forEach((order) => {
        const totalPrice = order.salePrice * order.quantity;
        htmlOrderDetail += `
        <tr>
            <td>${order.name}</td>
            <td class = "center">${formatNumber(order.quantity)}</td>
            <td class = "center">${order.unitName}</td>
            <td class = "alignright" >${formatNumber(order.salePrice)}</td>
            <td class = "alignright">${formatNumber(totalPrice)}</td>
        </tr>
        `
    });
    return `
    <?xml version="1.0" encoding="UTF-8"?>
    
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/TR/xhtml1" xml:lang="vn" lang="vn">
    
    <head>
        <meta charset="utf-8" />
        <title>Invoice</title>
    </head>
    
    <body>
        <table class="companyProfile" width="100%">
            <tr>
                <td width="75%">
                    <h3>CÔNG TY CỔ PHẦN KIM KHÍ HÓA CHẤT CÁT TƯỜNG</h3>
                    <p>Địa chỉ: 152 Giải Phóng - Cửa Bắc - Nam Định</p>
                    <p>phone: 0912.250.315 - 0916.698.845 - 0916.678.845</p>
                    <p>website: www.soncattuong.com</p>
                </td>
                <td width="25%">
                    <img width="100%" src="${logoImage}" alt="" />
                </td>
            </tr>
    
        </table>
        <h1 class="title" width: "100%">HÓA ĐƠN</h1>
        <table class="orderInfor" width="100%">
            <tr>
                <td width="50%">
                    <h2>${customerName}</h2>
                </td>
                <td width="50%">
                    <p>Ngày Lập: ${date}</p>
                    <p>Số Hóa Đơn: ${id}</p>
                </td>
            </tr>
        </table>
    
    
        <table class="orderDetail" width="100%">
            <thead>
                <tr>
                    <th>
                        <p><strong>Tên sản phẩm</strong></p>
                    </th>
                    <th>
                        <p><strong>Số lượng</strong></p>
                    </th>
                    <th>
                        <p><strong>Qui cách</strong></p>
                    </th>
                    <th>
                        <p><strong>Giá bán</strong></p>
                    </th>
                    <th>
                        <p><strong>Thành Tiền</strong></p>
                    </th>
                </tr>
            </thead>
            <tbody>
                ${htmlOrderDetail} 
            </tbody>
        </table>
        <table class="subTotal" width="100%">
            <tr>
                <th width="40%"></th>
                <td width="30%"><span>Tổng Tiền</span></td>
                <td width="25%"><span></span><span>${formatNumber(total)}</span></td>
            </tr>
            ${vatContent}            
            <tr>
                <th width="40%"></th>
                <td width="30%"><span>Nợ cũ</span></td>
                <td width="30%"><span></span><span>${formatNumber(oldDebt)}</span></td>
            </tr>
            <tr>
                <th width="40%"></th>
                <td width="30%"><span>Thanh Toán</span></td>
                <td width="30%"><span></span><span>${formatNumber(pay)}</span></td>
            </tr>
            <tr>
                <th width="40%"></th>
                <td width="30%"><span>Còn lại</span></td>
                <td width="30%"><span></span><span>${formatNumber(newDebt)}</span></td>
            </tr>
        </table>
    
        <table class="footer">
            <thead>
                <tr>
                    <th><span>Người Nhận</span></th>
                    <th><span>Thủ Kho</span></th>
                    <th><span>Người Bán</span></th>
                </tr>
            </thead>
        </table>
    </body>
    
    </html>
    `
}

export const css = () => {
    return `
    * {
        font-family: "VU Arial";
    }

    body {
        font-family: "VU Arial";
        box-sizing: border-box;
        height: 11in;
        margin: 0 auto;
        overflow: hidden;
        padding: 0.5in;
        width: 8.5in;
    }

    body {
        background: #FFF;
        border-radius: 1px;
        box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
    }


    @media print {
        * {
            -webkit-print-color-adjust: exact;
        }
        html {
            background: none;
            padding: 0;
        }
        body {
            box-shadow: none;
            margin: 0;
        }
        span:empty {
            display: none;
        }
    }

    @page {
        margin: 0;
    }

    table {
        border-collapse: collapse;
    }

    table.orderDetail th,
    table.orderDetail td {
        border-style: solid;
        border-width: 1px;
        padding: 2em;
        border-color: #7f8c8d;
    }

    table.orderDetail th {
        text-align: center;
    }

    table.orderDetail tr:nth-child(even) {
        background-color: #dddddd;
    }

    table.orderDetail td:nth-child(1) {
        width: 32%;
    }

    table.orderDetail td:nth-child(2) {
        text-align: center;
        width: 12%;
    }

    table.orderDetail td:nth-child(3) {
        text-align: center;
        width: 15%;
    }

    table.orderDetail td:nth-child(4) {
        text-align: right;
        width: 18%;
    }

    table.orderDetail td:nth-child(5) {
        text-align: right;
        width: 23%;
    }
    table.orderDetail td.alignright {
        text-align: right;
    }
    table.orderDetail td.center {
        text-align: center;
    }

    table.subTotal {
        float: right;
        margin-bottom: 20px;
    }

    table.subTotal tr:nth-child(even) td {
        background-color: #dddddd;
        
    }
    table.subTotal tr:nth-child(even),
    table.subTotal th:nth-child(2) {
        background-color: #dddddd;			
    }
    table.subTotal th:nth-child(2),
     table.subTotal td  {
        border-bottom: 1px solid #95a5a6;			
    }

    table.subTotal td {
        padding: 10px;
        text-align: right;
    }
    
    table.subTotal th {
        text-align: left;
    }

    table.footer {
        width: 100%;
    }

    table.footer td,
    th {
        font-weight: bold;
        text-align: center
    }

    .title {
        width: 100%;
        text-align: center;
        font-weight: bold;
    }

    table.companyProfile td {
        text-align: left;
        line-height: 1em;
    }

    table.orderInfor {
        text-align: center;
        font-weight: bold;
        margin-bottom: 20px;
    }
    `
}

export const sendMessage = (
    customerPhone,
    customerName,
    date,
    total,
    totalIncludeVat,
    vat,
    oldDebt,
    pay,
    newDebt,
    OrderDetail,
) => {
    let htmlOrderDetail = '';
    let totalPrice = 0;
    OrderDetail.forEach((order) => {
        totalPrice = order.salePrice * order.quantity;
        htmlOrderDetail += `${order.name}: ${formatNumber(order.quantity)} ${order.unitName} x ${formatNumber(order.salePrice)}. `
    });
    let totalIncludeVatText = '';
    if(vat > 0) totalIncludeVatText = `Tổng tiền gồm VAT: ${formatNumber(totalIncludeVat)},`
    Communications.text(customerPhone, `Kính gửi Quí Khách ${customerName} Hóa Đơn ngày: ${date}: 
    ${htmlOrderDetail}
    Tổng tiền: ${formatNumber(total)}, ${totalIncludeVatText} Nợ cũ: ${formatNumber(oldDebt)}, Thanh Toán: - ${formatNumber(pay)}, Còn Lại: ${formatNumber(newDebt)}
    `);
}
export const sendEmail = (
    customerEmail,
    customerName,
    date,
    total,
    totalIncludeVat,
    vat,
    oldDebt,
    pay,
    newDebt,
    OrderDetail,
) => {
    let htmlOrderDetail = '';
    let totalPrice = 0;
    OrderDetail.forEach((order) => {
        totalPrice = order.salePrice * order.quantity;
        htmlOrderDetail += `${order.name}: ${formatNumber(order.quantity)} ${order.unitName} x ${formatNumber(order.salePrice)} = ${formatNumber(totalPrice)}.
        `
    });
    let totalIncludeVatText = '';
    if(vat > 0) totalIncludeVatText = `Tổng tiền gồm VAT: ${totalIncludeVat},`
    Communications.email([customerEmail], null, null, 'Hóa Đơn', `Kính gửi Quí Khách ${customerName}
    
    
        Hóa Đơn ngày: ${date}: 

        ${htmlOrderDetail}

        Tổng tiền: ${formatNumber(total)}
        ${totalIncludeVatText} 
        Nợ cũ: ${formatNumber(oldDebt)}
        Thanh Toán: - ${formatNumber(pay)}
        Còn Lại: ${formatNumber(newDebt)}
    `);
}

export const logoImage = "data:image/png;base64,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befIEJIFkMf3MZZnOpPtprQcUSPYv3I7l7KPYA2MEqFGRRXtIyZZQmIHhCTadowMIlkDfUkzIV+e0qNoa7A3kRbHm60Ea6A/N5i8ZZiPhESWQhJtO0UGkqyBC1m2V1mrnWb5nmvKUBQBOYJB5L0t3789QDlCVACSRCshkaWQRNsOwUSGtchMJFkAxPEgy3gIk22LJXvUwnROJS3mdKAl+8ws7G63ABISEolDEm07AxPYX/jlGbvliALErB7P7Z2k91RThrJ093IbmfS+MhepKl4gISGRBkiibUdArCq/vEJaWEim418s7xTWamsS+rXm6HQnaakS2zsGSIcoCYnshSTadgImLazjTaTsIFlgF9ISRjwb169qygpI8yS+nltH68XKSHThVkhaoQYJCYksgyTadgAm2R78gvjUXnbLEieuYdlfZq22Pqata8qO5f//Se3bTBwKKJsH565yuwWRkJCIH5JosxxMVNDqkLQ/GzIdBQPm36O4vRdxK81MfAdpZmIl9WJlHBTaMc9bQqJdQBJtFoNJFh68T1JmJsSPFTfweXzMWm1zm29qypDk4mLSUkd2TrdgGQbE0s60WwgJCYn4IYk2u4Fwlmx3BhrF7U/cWsfValrsw6R5J0sQldgtgISERGKQRJulYC3wfH65zW45LABMomeRQbRabViUrZNabGv47BZAQkIiMUiizUIwye7NL09Q+1m3O165iq7131cwiCgXzk5j7RZIQkJCwipIos0yMMl255fXuBXZLYtl8OX0vOeSu94m8u9P2Z+bWEJCQqIVJNFmEXTnp5dIc4zJfvj5nByslBe4aB31Gkv+9qKgS0hISGyHJNrswu3cjrRbCEvAJOvIUchd4CCv6qFva0dTnacjFThq+TvVbukkJCQkLIMk2iwBa7On88uNdsuRNJhgsbLsLlTJmasRKlMtrWruSXMahtA+hT+SVndAQkJCon1ghyLaikHjESKB+p4ryhZdXWm3PLGCSRZJ5REv67BblqQAU7FToRwmWdWlaKRL4F0/1fvy6dua/Wifou8Dn0u0glTzJSSyFDsU0TKuIK183AYm3SX8OlVvMzKVeJlkc/jlRW6d7JYlKZhMxYqD2pCpylrtj3V78ecuW8TLAmywcmfKm2caxI27gVzKxgI5cionkspzJbcG03uk1RTPlP+012VoksQOjR2GaJlYQVT/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"