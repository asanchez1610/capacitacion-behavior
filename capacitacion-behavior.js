window.CellsBehaviors = window.CellsBehaviors || {};
CellsBehaviors.capacitacionBehavior = (superClass) => class extends superClass {
  // Declare properties
  static get properties() {
    return {
      /**
       * Defination endponits services
       */
      services: {
        type: Object
      },
      /**
       * Defination constants
       */
      ctts: {
        type: Object
      },
      /**
       * Defination events
       */
      events: {
        type: Object
      }
    };
  }

   /**
   * Method to extract key with data.
   * @method extract
   * @param {Object} data as payload
   * @param {String} keys at value
   * @param {String} value default is ret is undefined
   */
  extract(data, keys, value) {
    let ret;
    if (!this.isEmpty(data) && !this.isEmpty(keys)) {
      let split = keys.split('.');
      ret = data[split.shift()];
      while (ret && split.length) {
        ret = ret[split.shift()];
      }
    }
    return this.isEmpty(ret) && value !== null ? value : ret;
  }

  /**
   * Method to generate a new dispatch another text and detail.
   * @method dispatch
   * @param {String} name.
   * @param {Object} detail.
   */
  dispatch(name, detail) {
    const val = typeof detail === 'undefined' ? null : detail;
    this.dispatchEvent(new CustomEvent(name, {
      composed: true,
      bubbles: true,
      detail: val
    }));
  }

  // Initialize properties
  constructor() {
    super();
    if (this.events && this.navigate) {
      window.addEventListener(this.extract(this, 'events.menuSelectedOption'), (event)=>{
        console.log('Menu selected', event);
        let pageOption = this.extract(event.detail, 'page', null);
        if(pageOption){
            try {
              this.navigate(pageOption);
            } catch (error) {
              console.log('Pagina no encontrada', error);
            }
        }
      });
    }
  }

};