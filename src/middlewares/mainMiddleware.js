export const Middleware = (schema) => {
    schema.pre('save', function (next) {
      const offset = -3 * 60;
      const adjustTimezone = (date) => new Date(date.getTime() + offset * 60 * 1000);
  
      if (this.isNew) {
        this.createdAt = adjustTimezone(this.createdAt || new Date());
      }
      this.updatedAt = adjustTimezone(new Date());
  
      next();
    });
  };