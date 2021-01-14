import * as alertify from 'alertifyjs'

import 'alertifyjs/build/css/alertify.css'
import './useConfirm.less'

type Func = (...args: Array<any>) => any
type Props = { [key: string]: any }
type OpenArgs = {
  onOk?: Func
  onCancel?: Func
  onDiscard?: Func
}

if (!alertify.customConfirm) {
  alertify.dialog(
    'customConfirm',
    function factory() {
      return {
        setup() {
          return {
            buttons: [
              {
                className: 'ajs-cancel',
                key: 67, // ? C
                text: '<u>C</u>ancel',
                scope: 'auxiliary',
                invokeOnClose: true,
              },
              {
                className: 'ajs-discard',
                text: '<u>D</u>iscard',
                key: 68, // ? D key
              },
              {
                className: 'ajs-ok',
                key: 83, // ? S key
                text: '<u>S</u>ave',
              },
            ],
            focus: {
              element: 0,
              select: false,
            },
            options: {
              closable: false,
              closableByDimmer: false,
              maximizable: false,
              modal: true,
              movable: true,
              moveBounded: true,
              pinnable: false,
              resizable: false,
              transition: 'fade',
            },
          }
        },
        settings: {
          defaultFocus: null,
          labels: null,
          message: null,
          oncancel: null,
          onok: null,
          reverseButtons: null,
          ondiscard: null,
        },
        callback(closeEvent) {
          let returnValue

          switch (closeEvent.index) {
            // ?  Cancel
            case 0:
              if (typeof this['get']('oncancel') === 'function') {
                returnValue = this['get']('oncancel').call(this, closeEvent)

                if (typeof returnValue !== 'undefined') {
                  closeEvent.cancel = !returnValue
                }
              }

              break

            // ? Discard
            case 1:
              if (typeof this['get']('ondiscard') === 'function') {
                returnValue = this['get']('ondiscard').call(this, closeEvent)

                if (typeof returnValue !== 'undefined') {
                  closeEvent.cancel = !returnValue
                }
              }

              break

            // ?  Ok
            case 2:
              if (typeof this['get']('onok') === 'function') {
                returnValue = this['get']('onok').call(this, closeEvent)

                if (typeof returnValue !== 'undefined') {
                  closeEvent.cancel = !returnValue
                }
              }

              break
          }
        },
      }
    },
    false,
    'confirm'
  )
}

export const useConfirm = (settings: Props = {}) => {
  return {
    open({ onOk = () => {}, onCancel = () => {}, onDiscard = () => {} }: OpenArgs) {
      const ccInstance = alertify
        .customConfirm(
          `There are some unsaved changes...`,
          `Any unsaved changes will be lost, are you sure you want to leave?`,
          () => onOk(ccInstance),
          () => onCancel(ccInstance)
        )
        .setting({
          ondiscard: () => onDiscard(ccInstance),
        })
    },
  }
}
