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
                  taskName: { type: 'string', example: 'Develop API' },
                  description: { type: 'string', example: 'Implement authentication and CRUD operations' },
                  startDate: { type: 'string', format: 'date', example: '2025-02-10' },
                  endDate: { type: 'string', format: 'date', example: '2025-02-15' },
                  assignedUser: { type: 'string', example: '667a559249dc37e48ea658aa' },
                  status: { type: 'string', enum: ['pending', 'completed'], example: 'pending' },
                  completionDate: { type: 'string', format: 'date-time', example: '2025-02-15T10:30:00Z'},
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
        description: 'Get all task',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/SuccessResponseTask.' },
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
                schema: { $ref: '#/components/schemas/SuccessResponseItem' },
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
                  taskName: { type: 'string', example: 'Develop API' },
                  description: { type: 'string', example: 'Implement authentication and CRUD operations' },
                  startDate: { type: 'string', format: 'date', example: '2025-02-10' },
                  endDate: { type: 'string', format: 'date', example: '2025-02-15' },
                  assignedUser: { type: 'string', example: '667a559249dc37e48ea658aa' },
                  status: { type: 'string', enum: ['pending', 'completed'], example: 'pending' },
                  completionDate: { type: 'string', format: 'date-time', example: '2025-02-15T10:30:00Z'},
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
                schema: { $ref: '#/components/schemas/SuccessResponseItem' },
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
};

module.exports = path;
  