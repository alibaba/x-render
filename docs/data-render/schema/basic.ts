export default [
  {
    "widget": "FTitle",
    "data": "预定信息",
    "dataKey": "orderInfo.orderBooking",
    "x-component-props": {
      "border": false
    }
  },
  {
    "widget": "FDescriptions",
    "items": [
      {
        "dataKey": "guestInfo.fieldValue",
        "label": "{{ $d.guestInfo.fieldDesc }}",
        "render": "guestListRender",
        "span": 1
      },
      {
        "dataKey": "contactPhone.fieldValue",
        "label": "{{ $d.contactPhone.fieldDesc }}",
        "render": "operateRender",
        "span": 1
      },
      {
        "dataKey": "bookerMemberCardNo.fieldValue",
        "label": "{{ $d.bookerMemberCardNo.fieldDesc }}",
        "span": 1
      },
      {
        "dataKey": "outConfirmCode.fieldValue",
        "label": "{{ $d.outConfirmCode.fieldDesc }}",
        "render": "textRender",
        "defaultValue": "-",
        "span": 1
      },
      {
        "dataKey": "roomName.fieldValue",
        "label": "{{ $d.roomName.fieldDesc }}",
        "render": "roomNameRender",
        "span": 1
      },
      {
        "label": "{{ $d.arriveTime.fieldDesc }}",
        "format": {
          "type": "dateTime-range",
          "config": {
            "format": "YYYY/MM/DD HH:mm",
            "startKey": "arriveTime.fieldValue.earlyArriveTime",
            "endKey": "arriveTime.fieldValue.lateArriveTime"
          }
        },
        "span": 1
      },
      {
        "dataKey": "hourRoomArriveTime.fieldValue",
        "label": "{{ $d.hourRoomArriveTime.fieldDesc }}",
        "render": "textRender",
        "span": 1
      },
      {
        "dataKey": "checkInOutDate.fieldValue",
        "label": "{{ $d.checkInOutDate.fieldDesc }}",
        "render": "checkInOutDateRender",
        "span": 1
      },
      {
        "dataKey": "lateArriveTime.fieldValue",
        "label": "{{ $d.lateArriveTime.fieldDesc }}",
        "render": "textRender",
        "span": 1
      },
      {
        "dataKey": "hourRoomLeaveTime.fieldValue",
        "label": "{{ $d.hourRoomLeaveTime.fieldDesc }}",
        "render": "textRender",
        "span": 1
      },
      {
        "dataKey": "guarantee.fieldValue",
        "label": "{{ $d.guarantee.fieldDesc }}",
        "span": 1
      },
      {
        "dataKey": "cancelPolicy.fieldValue",
        "label": "{{ $d.cancelPolicy.fieldDesc }}",
        "render": "textRender",
        "span": 2
      },
      {
        "dataKey": "xItemPackageDO.fieldValue",
        "label": "{{ $d.xItemPackageDO.fieldDesc }}",
        "render": "packageRender",
        "span": 1
      },
      {
        "dataKey": "packageOrders.fieldValue",
        "label": "{{ $d.packageOrders.fieldDesc }}",
        "render": "packageOrdersRender",
        "span": 1
      },
      {
        "dataKey": "relatedCode.fieldValue",
        "label": "{{ $d.relatedCode.fieldDesc }}",
        "render": "textRender",
        "span": 1
      },
      {
        "dataKey": "mianfangOrderCouponList.fieldValue",
        "label": "{{ $d.mianfangOrderCouponList.fieldDesc }}",
        "render": "listRender",
        "span": 1
      },
      {
        "dataKey": "creditCard",
        "label": "{{ $d.creditCard.fieldDesc }}",
        "render": "vccRender",
        "span": 1
      }
    ],
    "dataKey": "orderInfo.orderBooking",
    "style": {
      "background": "#f9f9f9",
      "padding": "12px 12px 4px 12px",
      "marginBottom": "12px"
    },
    "labelStyle": {
      "color": "#666666"
    },
    "column": 2
  },
  {
    "widget": "FDescriptions",
    "items": [
      {
        "dataKey": "bookingSellerActualPrice.fieldValue",
        "label": "{{ $d.bookingSellerActualPrice.fieldDesc }}",
        "labelToolTip": {
          "title": "{{ $d.bookingSellerActualPrice.fieldTips }}"
        },
        "render": "feeRender",
        "x-component-props": {
          "showName": false,
          "copy": true,
          "bold": true
        }
      },
      {
        "dataKey": "bookingRoomsPrice.fieldValue",
        "label": "{{ $d.bookingRoomsPrice.fieldDesc }}",
        "tooltip": "{{ $d.bookingRoomsPrice.fieldTips }}",
        "render": "feeRender",
        "x-component-props": {
          "showName": false,
          "bold": true
        }
      },
      {
        "dataKey": "sellerDecreasePrice.fieldValue",
        "label": "{{ $d.sellerDecreasePrice.fieldDesc }}",
        "render": "decreasePriceRender",
        "x-component-props": {
          "showName": false,
          "bold": true,
          "dataPath": "orderInfo.orderPrice.showPromotionDetail"
        }
      },
      {
        "dataKey": "orderDecreaseDetails",
        "render": "promotionDetailTableRender",
        "x-component-props": {
          "style": {
            "marginLeft": -8
          }
        },
        "showKey13": "showPromotionDetail"
      },
      {
        "label": "{{ $s.orderSettleInfo.preSettlePrice.fieldDesc }}",
        "labelToolTip": {
          "title": "{{ $s.orderSettleInfo.preSettlePrice.fieldTips}}"
        },
        "render": "feeRender",
        "x-component-props": {
          "showName": false,
          "bold": true
        },
        "data": "{{ $s.orderSettleInfo.preSettlePrice.fieldValue }}"
      },
      {
        "label": "{{ $s.orderSettleInfo.preCommissionPrice.fieldDesc }}",
        "labelToolTip": {
          "title": "{{ $s.orderSettleInfo.preCommissionPrice.fieldTips }}"
        },
        "render": "feeRender",
        "x-component-props": {
          "showName": false,
          "bold": true
        },
        "data": "{{ $s.orderSettleInfo.preCommissionPrice.fieldValue }}"
      },
      {
        "label": "{{ $s.orderSettleInfo.otherFee.fieldDesc }}",
        "render": "feeRender",
        "data": "{{ $s.orderSettleInfo.otherFee.fieldValue }}",
        "x-component-props": {
          "bold": true
        }
      },
      {
        "label": "{{ $s.orderSettleInfo.preRewardPrice.fieldDesc }}",
        "render": "feeRender",
        "x-component-props": {
          "showName": false,
          "bold": true
        },
        "data": "{{ $s.orderSettleInfo.preRewardPrice.fieldValue }}"
      },
      {
        "dataKey": "dailyPriceList.fieldValue",
        "label": "{{ $d.dailyPriceList.fieldDesc }}",
        "render": "textRender"
      },
      {
        "dataKey": "dailyPriceList.fieldValue",
        "render": "dailyPriceDOListRender",
        "x-component-props": {
          "style": {
            "fontWeight": 400
          }
        }
      }
    ],
    "dataKey": "orderInfo.orderPrice",
    "colon": false,
    "itemShowLevel": 1,
    "labelStyle": {
      "marginRight": 8,
      "color": "#666666"
    },
    "column": 1
  },
  {
    "widget": "FTitle",
    "data": "发票信息",
    "hidden": "{{ !$s.orderInvoice}}"
  },
  {
    "widget": "FDescriptions",
    "column": 2,
    "items": [
      {
        "dataKey": "invoiceRequirement.fieldValue",
        "label": "{{ $d.invoiceRequirement.fieldDesc }}",
        "render": "textRender",
        "x-component-props": {
          "copy": true
        },
        "span": 1
      },
      {
        "dataKey": "invoiceExplain.fieldValue",
        "label": "{{ $d.invoiceExplain.fieldDesc }}",
        "render": "textRender",
        "span": 2
      },
      {
        "dataKey": "invoiceStatusStr.fieldValue",
        "label": "{{ $d.invoiceStatusStr.fieldDesc }}",
        "render": "textRender",
        "span": 1
      },
      {
        "dataKey": "invoiceTypeStr.fieldValue",
        "label": "{{ $d.invoiceTypeStr.fieldDesc }}",
        "render": "textRender",
        "span": 1
      },
      {
        "dataKey": "invoiceDetail.receiverInfo.logisticsMailNumDesc.fieldValue",
        "label": "{{ $d.invoiceDetail.receiverInfo.logisticsMailNumDesc.fieldDesc }}",
        "render": "textRender",
        "span": 2
      },
      {
        "dataKey": "invoiceConfig",
        "label": "快递单号",
        "render": "mailNumRender",
        "span": 2
      },
      {
        "label": "{{ $s.orderSettleInfo.settleDate.fieldDesc }}",
        "render": "textRender",
        "hidden": "{{ !$s.orderSettleInfo.settleDate.fieldDesc }}",
        "format": {
          "type": "dateTime",
          "config": "YYYY-MM-DD HH:mm:ss"
        },
        "data": "{{ $s.orderSettleInfo.settleDate.fieldValue }}",
        "span": 1
      },
      {
        "dataKey": "invoiceDetail",
        "span": 2,
        "showLevel": 1,
        "render": "invoiceCardRender"
      }
    ],
    "dataKey": "orderServiceInfo.invoice"
  },
  {
    "widget": "FDescriptions",
    "items": [
      {
        "dataKey": "providerDesc.fieldValue",
        "label": "data:providerDesc.fieldDesc",
        "render": "textRender",
        "x-component-props": {
          "copy": true
        }
      },
      {
        "dataKey": "invoiceExplain.fieldValue",
        "label": "data:invoiceExplain.fieldDesc",
        "render": "textRender",
        "span": 2
      },
      {
        "dataKey": "statusStr.fieldValue",
        "label": "data:statusStr.fieldDesc",
        "render": "textRender"
      },
      {
        "dataKey": "invoiceType.fieldValue",
        "label": "data:invoiceType.fieldDesc",
        "render": "textRender"
      },
      {
        "dataKey": "mailNum",
        "label": "快递单号",
        "render": "textRender",
        "span": 2
      },
      {
        "dataKey": "invoiceConfig",
        "label": "快递单号",
        "render": "mailNumRender",
        "span": 2
      },
      {
        "dataKey": "settleDate.fieldValue",
        "label": "data:settleDate.fieldDesc",
        "render": "textRender"
      },
      {
        "dataKey": "invoiceDetailVO",
        "span": 2,
        "showLevel": 1,
        "render": "invoiceCardRender"
      }
    ],
    "dataKey": "orderInvoice",
    "colon": false,
    "itemShowLevel": 1,
    "labelStyle": {
      "marginRight": 8,
      "color": "#666666"
    }
  },
  {
    "widget": "FTitle",
    "data": "退款信息",
    "dataKey": "orderRefundInfo"
  },
  {
    "widget": "FDescriptions",
    "items": [
      {
        "dataKey": "closeReason.fieldValue",
        "label": "{{ $d.closeReason.fieldDesc }}",
        "render": "textRender"
      },
      {
        "dataKey": "refundAmount.fieldValue",
        "label": "{{ $d.refundAmount.fieldDesc }}",
        "render": "feeRender",
        "x-component-props": {
          "showName": false
        }
      },
      {
        "dataKey": "refundReason.fieldValue",
        "label": "{{ $d.refundReason.fieldDesc }}",
        "render": "textRender"
      },
      {
        "dataKey": "refundDesc.fieldValue",
        "label": "{{ $d.refundDesc.fieldDesc }}",
        "render": "textRender"
      }
    ],
    "dataKey": "orderRefundInfo",
    "colon": false,
    "itemShowLevel": 1,
    "labelStyle": {
      "marginRight": 8,
      "color": "#666666"
    },
    "column": 2
  },
  {
    "widget": "FTitle",
    "data": "服务信息",
    "dataKey": "orderServiceInfo"
  },
  {
    "widget": "FDescriptions",
    "items": [
      {
        "dataKey": "fliggyMemo.fieldValue",
        "label": "{{ $d.fliggyMemo.fieldDesc }}",
        "render": "textRender"
      },
      {
        "dataKey": "macaoGovCouponGuest.fieldValue",
        "label": "{{ $d.macaoGovCouponGuest.fieldDesc }}",
        "render": "textRender"
      },
      {
        "dataKey": "guestMemo.fieldValue",
        "label": "{{ $d.guestMemo.fieldDesc }}",
        "render": "textRender"
      },
      {
        "dataKey": "writeOff.fieldValue",
        "label": "{{ $d.writeOff.fieldDesc }}",
        "render": "listRender"
      },
      {
        "dataKey": "groupBuy.fieldValue",
        "label": "{{ $d.groupBuy.fieldDesc }}",
        "render": "textRender"
      },
      {
        "dataKey": "guestRights.fieldValue",
        "label": "{{ $d.guestRights.fieldDesc }}",
        "render": "textRender"
      },
      {
        "dataKey": "memberBenefit.fieldValue",
        "label": "{{ $d.memberBenefit.fieldDesc }}",
        "render": "textRender"
      }
    ],
    "dataKey": "orderServiceInfo",
    "labelStyle": {
      "color": "#666666"
    },
    "column": 2
  },
  {
    "widget": "FTitle",
    "data": "结账信息",
    "dataKey": "orderServiceInfo"
  },
  {
    "widget": "FDescriptions",
    "items": [
      {
        "dataKey": "settlingRoomPrice.fieldValue",
        "label": "{{ $d.settlingRoomPrice.fieldDesc }}",
        "render": "feeRender"
      },
      {
        "dataKey": "settleStatus.fieldValue",
        "label": "{{ $d.settleStatus.fieldDesc }}",
        "render": "textRender"
      },
      {
        "dataKey": "tradeDate.fieldValue",
        "label": "{{ $d.tradeDate.fieldDesc }}",
        "format": {
          "type": "dateTime",
          "config": "YYYY/MM/DD HH:mm:ss"
        }
      },
      {
        "dataKey": "settleDate.fieldValue",
        "label": "{{ $d.settleDate.fieldDesc }}",
        "format": {
          "type": "dateTime",
          "config": "YYYY/MM/DD HH:mm:ss"
        }
      },
      {
        "dataKey": "settleAccount.fieldValue",
        "label": "{{ $d.settleAccount.fieldDesc }}",
        "render": "textRender"
      },
      {
        "dataKey": "commissionPrice.fieldValues",
        "label": "{{ $d.commissionPrice.fieldDesc }}",
        "render": "feeListRender"
      },
      {
        "dataKey": "otherFee.fieldValue",
        "label": "{{ $d.otherFee.fieldDesc }}",
        "render": "feeRender"
      },
      {
        "dataKey": "alipayTradeNo.fieldValue",
        "label": "{{ $d.alipayTradeNo.fieldDesc }}",
        "render": "textRender"
      },
      {
        "dataKey": "interceptAmount.fieldValues",
        "label": "{{ $d.interceptAmount.fieldDesc }}",
        "render": "feeListRender"
      },
      {
        "dataKey": "settleAccountType.fieldValue",
        "label": "{{ $d.settleAccountType.fieldDesc }}",
        "render": "textRender"
      }
    ],
    "dataKey": "orderSettleInfo",
    "labelStyle": {
      "color": "#666666"
    },
    "column": 2
  },
  {
    "widget": "FTitle",
    "data": "关联订单",
    "dataKey": "orderServiceInfo"
  },
  {
    "widget": "FDescriptions",
    "items": [
      {
        "render": "relationOrderListRender"
      }
    ],
    "dataKey": "orderInfo.relationOrders",
    "labelStyle": {
      "color": "#666666"
    }
  }
]