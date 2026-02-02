import Joi from "joi";

// User Validation Schema
export const validateUser = (req, res, next) => {
  const userSchema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(50)
      .required()
      .pattern(/^[a-zA-Z\s.'-]+$/)
      .messages({
        "string.pattern.base":
          "Name can only contain letters, spaces, dots, apostrophes and hyphens",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 2 characters",
        "string.max": "Name must be less than 50 characters",
      }),

    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Email is required",
    }),

    password: Joi.string().min(6).max(100).required().messages({
      "string.min": "Password must be at least 6 characters",
      "string.empty": "Password is required",
    }),

    phone: Joi.string()
      .pattern(/^[\+]?[1-9][0-9]{7,14}$/)
      .optional()
      .allow("")
      .messages({
        "string.pattern.base":
          "Please enter a valid phone number (e.g., +923001234567)",
      }),

    address: Joi.string().max(200).optional().allow(""),

    image: Joi.string().optional().allow(""),
  });

  const { error } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path[0],
      message: detail.message,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }
  next();
};

// Doctor Validation Schema
export const validateDoctor = (req, res, next) => {
  const doctorSchema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(50)
      .required()
      .pattern(/^[a-zA-Z\s.'-]+$/)
      .messages({
        "string.pattern.base":
          "Name can only contain letters, spaces, dots, apostrophes and hyphens",
        "string.empty": "Doctor name is required",
        "string.min": "Name must be at least 2 characters",
      }),

    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Email is required",
    }),

    about: Joi.string().min(10).max(300).required().messages({
      "string.empty": "About doctor field is required",
      "string.min": "About must be at least 10 characters",
      "string.max": "About must be less than 300 characters",
    }),

    degree: Joi.string().min(2).max(100).required().messages({
      "string.empty": "Degree is required",
      "string.min": "Degree must be at least 2 characters",
    }),

    experience: Joi.number().integer().min(0).max(70).required().messages({
      "number.base": "Experience must be a number",
      "number.integer": "Experience must be a whole number",
      "number.min": "Experience cannot be negative",
      "number.max": "Experience cannot exceed 70 years",
      "any.required": "Experience is required",
    }),

    fees: Joi.number().min(0).max(50000).required().messages({
      "number.base": "Fees must be a number",
      "number.min": "Fees cannot be negative",
      "number.max": "Fees cannot exceed 50,000, Think about patients first",
      "any.required": "Fees is required",
    }),

    phone: Joi.string()
      .pattern(/^[\+]?[1-9][0-9]{7,14}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Please enter a valid phone number (e.g., +923001234567)",
        "string.empty": "Phone number is required",
      }),

    address: Joi.string().min(5).max(200).required().messages({
      "string.empty": "Address is required",
      "string.min": "Address must be at least 5 characters",
    }),
  });

  // For updates, make fields optional
  const updateDoctorSchema = doctorSchema.fork(
    Object.keys(doctorSchema.describe().keys),
    (schema) => schema.optional()
  );

  const schemaToUse =
    req.method === "PATCH" ? updateDoctorSchema : doctorSchema;
  const { error } = schemaToUse.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path[0],
      message: detail.message,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};
