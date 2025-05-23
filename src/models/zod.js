const { z } = require("zod");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; //* Normalde zod şifreleme için kendi yapısını kullanıyor ancak default olarak maks. 8 karakter istiyor. Biz daha farklı bir yapı istediğimiz için burada değişken içinde istediğimiz yapıyı tanımladık.

const userCreateSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .trim(),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .trim(),
    isActive: z.boolean().optional(),
    isAdmin: z.boolean().optional(),
  }),
});

//* optional validation için değil body'de gönderilmese de olur anlamında eğer body içinde gönderiliyorsa şartlara uymak zorunda.

const userUpdateSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .trim()
      .optional(),
    email: z.string().email("Please enter a valid email address").optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .trim()
      .optional(),
    isActive: z.boolean().optional(),
    isAdmin: z.boolean().optional(),
  }),
});

module.exports = {
  userCreateSchema,
  userUpdateSchema,
};
