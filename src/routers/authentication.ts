import createRouter from '@/utilities/functions/createRouter';
import { authenticate } from '@/services/authentication/authenticate';
import logger from '@/utilities/logger';

const router = createRouter();

/**
 *
 * @api {post} /authentication/login Login
 * @apiName Login
 * @apiGroup Authentication
 * @apiVersion  0.0.1
 *
 *
 * @apiParam {String} username Username of account to login
 * @apiParam {String} password Password of account to login
 *
 * @apiSuccess (200) {String} token The JWT token used for authentication
 *
 * @apiParamExample  {json} Request-Example:
   {
       "username": "TooMuchMoney",
       "password": "Actua11yBroke"
   }
 *
 *
 * @apiSuccessExample {type} Success-Response:
   {
       token : eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJmM2YxYTNiZjk3OGU0MNDVkY2Y2YSJ9.TLkEYpBlKrDxNO73edz-bXJ6XH1rqx8LimtkY
   }
 *
 *
 */
router.post('/login', (req, res) => {
  if (!req.body.password || !req.body.username) {
    res.sendStatus(400);
    return;
  }

  authenticate(req.body.username, req.body.password)
    // Unauthorized
    .catch((err) => {
      res.sendStatus(401);
    })
    // Authorized
    .then((token) => {
      res.status(200).json({ token });
    })
    // Server error
    .catch((err) => {
      logger.debug(err);
      res.sendStatus(500);
    });
});

/** Authentication Router */
export default router;
