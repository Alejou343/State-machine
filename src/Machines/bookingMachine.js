import { createMachine, assign } from "xstate";
import {fetchCountries} from "../utils/api.js"

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        id: 'getCountries',
        src: () => fetchCountries,
        onDone: {
          target: 'success',
          actions: assign({
            countries: (context, event) => event.data,
          })
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: 'Fallo el request',
          })
        }
      }
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: "loading" },
      },
    },
  },
};

const bookingMachine = createMachine({  
  id: "buy plane tickets",
  initial: "initial",
  context: {
    passengers: [],
    selectedCountry: '',
    selectedCountryDestination: '',
    selectedInitialDate: '',
    selectedFinalDate: '',
    countries: [],
    error: '',
  },
  states: {
    initial: {
      on: {
        START: "search"
      },
    },
    search: {
      on: {
        CONTINUE: {
          target: "passengers",
          actions: assign({selectedCountry: (context, event) => event.selectedCountry, 
            selectedCountryDestination: (context, event) => event.selectedCountryDestination,
            selectedInitialDate: (context, event) => event.selectedInitialDate,
            selectedFinalDate: (context, event) => event.selectedFinalDate,
          })
        },
        CANCEL: {
          target: "initial",
          actions: assign({selectedCountry: () => "", passengers: () => []})
        },
      },
      ...fillCountries,
    },
    tickets: {
      on: {
        FINISH: {
          target: "initial",
          actions: assign({selectedCountry: () => "", passengers: () => []})
        },
      },
    },
    passengers: {
      on: {
        DONE: "tickets",
        CANCEL: {
          target: "initial",
          actions: assign({selectedCountry: () => "", passengers: () => []})
        },
        ADD: {
          target: "passengers",
          actions: assign((context, event) => context.passengers.push(event.newPassenger))
        }
      },
    },
  },
},
);

export default bookingMachine;