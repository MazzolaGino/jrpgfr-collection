export default class Notif {
    constructor() {
        return new Notyf({
            duration: 2000,
            position: {
              x: 'right',
              y: 'top',
            },
            types: [
              {
                type: 'warning',
                background: 'orange',
                icon: {
                  className: 'material-icons',
                  tagName: 'i',
                  text: 'warning'
                }
              },
              {
                type: 'error',
                background: 'rgb(255, 0, 242)',
                duration: 2000,
                dismissible: true
              }
            ]
          });
    }
}