const schema = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email'
    },
    url: {
      type: 'string',
    },
    visas: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'string',
        enum: [
          'O-1',
          'EB-1A',
          'EB-2 NIW',
          'I don\'t know'
        ]
      }
    },
    // resume: {
    //   type: 'file'
    // },
    help: {
      type: 'string',
    }
  },
  required: [
    'firstName',
    'lastName',
    'email',
    'url',
    'visas',
    // 'resume',
    'help'
  ]
}

const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/firstName'
    },
    {
      type: 'Control',
      scope: '#/properties/lastName'
    },
    {
      type: 'Control',
      scope: '#/properties/email',
    },
    {
      type: 'Control',
      scope: '#/properties/url',
      label: 'Linkedin / Personal Website URL'
    },
    {
      type: 'Control',
      scope: '#/properties/visas',
      label: 'Visa categories of interest',
    },
    {
      type: 'Control',
      label: 'How can we help you?',
      scope: '#/properties/help',
      options: {
        multi: true
      }
    }
  ]
}

const data = {
  resume: null
}

export {
  schema,
  uischema,
  data
}