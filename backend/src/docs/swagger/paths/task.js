const path = {
    '/api/v1/task': {
      post: {
        tags: ['Task'],
        description: 'Create a new Task',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  taskName: { type: 'string' },
                  description: { type: 'string' },
                  startDate: { type: 'string', format: 'date'},
                  endDate: { type: 'string', format: 'date'},
                  assignedUser: { type: 'string' },
                  status: { type: 'string', enum: ['pending', 'completed']},
                  completionDate: { type: 'string', format: 'date-time'},
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Task created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SuccessResponseTask' },
              },
            },
          },
          400: {
            description: 'Validation error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
      get: {
        tags: ['Task'],
        description: 'Get all task created',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/SuccessResponseTask' },
                },
              },
            },
          },
          500: {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },
    '/api/v1/task/{id}': {
      get: {
        tags: ['Task'],
        description: 'Get task by ID',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SuccessResponseTask' },
              },
            },
          },
          404: {
            description: 'Item not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
      put: {
        tags: ['Task'],
        description: 'Update an task',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  taskName: { type: 'string'  },
                  description: { type: 'string'  },
                  startDate: { type: 'string' },
                  endDate: { type: 'string' },
                  assignedUser: { type: 'string' },
                  status: { type: 'string', enum: ['pending', 'completed'] },
                  completionDate: { type: 'string', format: 'date-time'},
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Item updated successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SuccessResponseTask' },
              },
            },
          },
          400: {
            description: 'Validation error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
          404: {
            description: 'Item not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Task'],
        description: 'Delete an task',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'Task deleted successfully',
          },
          404: {
            description: 'Task not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },
    '/api/v1/task/user': {
      get: {
        tags: ['Task'],
        description: 'Get all task for a user',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/SuccessResponseTask' },
                },
              },
            },
          },
          500: {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },
    '/api/v1/task/{id}/complete': {
      put: {
        tags: ['Task'],
        description: 'Make a task complete',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        // requestBody: {
        //   required: true,
        //   content: {
        //     'application/json': {
        //       schema: {
        //         type: 'object',
        //         properties: {
        //           taskName: { type: 'string'  },
        //           description: { type: 'string'  },
        //           startDate: { type: 'string' },
        //           endDate: { type: 'string' },
        //           assignedUser: { type: 'string' },
        //           status: { type: 'string', enum: ['pending', 'completed'] },
        //           completionDate: { type: 'string', format: 'date-time'},
        //         },
        //       },
        //     },
        //   },
        // },
        responses: {
          200: {
            description: 'Item updated successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SuccessResponseTask' },
              },
            },
          },
          400: {
            description: 'Validation error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
          404: {
            description: 'Item not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },
};

module.exports = path;
  