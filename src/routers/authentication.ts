import createRouter from '@/utilities/functions/createRouter';

const router = createRouter();

router.post('/login', (res, req) => {
  if (!res.body.password || !res.body.username) {

  }
});

export default router;
