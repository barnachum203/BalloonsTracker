export default function joiMiddleware(schema) {
  return (req, res, next) => {
    // console.log(req.body);
    const { error } = schema.validate(req.body);

    const valid = error == null;
    console.log('VALIDATION: ' + valid);

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');

      console.log('error', message);
      return res.status(422).json({ error: message });
    }
  };
}
