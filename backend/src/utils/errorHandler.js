exports.handleError = (res, error) => {

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: messages.join(', '), data: null });
    }

    if (error.message === 'Email already exists') {
      return res.status(400).json({ success: false, message: error.message, data: null });
    }

    if ( 
          error.message === 'User not found' ||
          error.message === 'Task not found' 
       ) {
      return res.status(404).json({ success: false, message: error.message, data: null });
    }

    if (error.message === 'Invalid credentials') {
      return res.status(401).json({ success: false, message: error.message, data: null });
    }

    if (error.message === 'Unauthorized: You are not assigned to this task') {
      return res.status(403).json({ success: false, message: error.message, data: null });
    }
  
    const message = error.message || "Internal Server Error";
    res.status(500).json({ success: false, message: message, data: null });
};
  
