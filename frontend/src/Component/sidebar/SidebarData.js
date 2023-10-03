import React, { Component } from 'react';


import { BsHouseFill } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { BsStickiesFill } from "react-icons/bs";
import { BsPersonLinesFill } from "react-icons/bs";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { BsFileEarmarkArrowUpFill } from "react-icons/bs";
import { BsPersonCircle , BsCashCoin ,BsFillFileEarmarkBreakFill ,BsCash ,BsGrid3X3GapFill } from "react-icons/bs";

export const SidebarData = [
    {
        title: "Home",
        icon: <BsHouseFill />,
        Link: "/home"
    },
    {
        title: "Accounts",
        icon: <BsPeopleFill />,
        Link: "/Accounts"
    },
   
    {
        title: "Products",
        icon: <BsGrid3X3GapFill />,
        Link: "/Products"
    },
    {
        title: "Advance",
        icon: <BsCash />,
        Link: "/advance"
    },
    {
        title: "Invoice",
        icon: <BsFileEarmarkArrowUpFill />,
        Link: "/invoice"
    },
    {
        title: "All Invoices",
        icon: <BsFileEarmarkArrowUpFill />,
        Link: "/allInvoice"
    },
    {
        title: "Quotation",
        icon: <BsFillFileEarmarkBreakFill />,
        Link: "/quotation"
    }, {
        title: "Payminder",
        icon: <BsCashCoin />,
        Link: "/invoiceList"
    }
]