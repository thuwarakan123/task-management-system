const path = {
  '/api/v1/auth/register': {
    post: {
      tags: ['Auth'],
      description: 'Register a new user and admin',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                firstName: { type: "string" },
                lastName: { type: "string" },
                email: { type: "string" },
                mobileNumber: { type: "string" },
                address: { type: "string" },
                password: { type: "string" },
                role: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'User created successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SuccessResponseUser' },
            },
          },
        },
        400: {
          description: 'Error creating user',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },
  },
  '/api/v1/auth/login': {
    post: {
      tags: ['Auth'],
      description: 'This endpoint is used to login the user and admin',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string' },
                password: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Successfully logged in',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/TokenResponse' },
            },
          },
        },
        401: {
          description: 'Invalid credentials',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
        400: {
          description: 'Error logging in',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },
  },
  '/api/v1/auth/send-otp': {
    post: {
      tags: ['Auth'],
      description: 'This endpoint is used to send otp to the user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Successfully email send with otp',
          content: {
            'application/json': {
              schema: { 
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string' },
                  data: { type: 'string', nullable: true },
                },
              },
            },
          },
        },
        500: {
          description: 'Internal Server Error',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },
  },
  '/api/v1/auth/verify-otp': {
    post: {
      tags: ['Auth'],
      description: 'This endpoint is used to verify otp to the user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string' },
                otp: { type: 'string'}
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Successfully verifyed the otp',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/TokenResponse' },
            },
          },
        },
        500: {
          description: 'Internal Server Error',
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