import createRouter from '@/utilities/functions/createRouter';
import { authenticate } from '@/services/authentication/authenticate';
import logger from '@/utilities/logger';

const router = createRouter();

router.post('/login', (req, res) => {
  if (!req.body.password || !req.body.username) {
    res.sendStatus(400);
    res.end();
    return;
  }

  authenticate(req.body.username, req.body.password)
    // Unauthorized
    .catch((err) => {
      res.sendStatus(401).end();
    })
    // Authorized
    .then((token) => {
      res.status(200).json({ token });
    })
    // Server error
    .catch((err) => {
      logger.debug(err);
      res.sendStatus(500).end();
    });
});

// TODO: Add jsdoc
export default router;
