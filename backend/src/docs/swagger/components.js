const component = {
    schemas: {
      User: {
        type: "object",
        properties: {
          _id: { type: 'string' },
          firstName: { type: "string" },
          lastName: { type: "string" },
          email: { type: "string" },
          mobileNumber: { type: "string" },
          address: { type: "string" },
          password: { type: "string" },
          role: { type: "string" },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        }
      },
      TokenResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'User logined successfully' },
          data: {
            type: 'object',
            properties: {
              user: { $ref: '#/components/schemas/User' },
              token: { type: 'string', example: 'jwt_token_here' },
            },
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string' },
          data: { type: 'string', nullable: true },
        },
      },
      Task: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '667a559249dc37e48ea658cc' },
          taskName: { type: 'string', example: 'Develop API' },
          description: { type: 'string', example: 'Implement authentication and CRUD operations' },
          startDate: { type: 'string', format: 'date', example: '2025-02-10' },
          endDate: { type: 'string', format: 'date', example: '2025-02-15' },
          assignedUser: { type: 'string', example: '667a559249dc37e48ea658aa' },
          status: { type: 'string', enum: ['pending', 'completed'], example: 'pending' },
          completionDate: { type: 'string', format: 'date-time', example: '2025-02-15T10:30:00Z' },
          createdAt: { type: 'string', format: 'date-time', example: '2025-02-01T12:00:00Z' },
          updatedAt: { type: 'string', format: 'date-time', example: '2025-02-05T15:45:00Z' },
        },
      },
      SuccessResponseTask: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Task created successfully' },
          data: {
            $ref: '#/components/schemas/Task',
          },
        },
      },
      SuccessResponseUser: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'User created successfully' },
          data: {
            $ref: '#/components/schemas/User',
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your token in the format: Bearer <token>',
      },
    },
};

module.exports = component;
  