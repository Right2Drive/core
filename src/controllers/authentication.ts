import createRouter from '@/utilities/functions/createRouter';

const router = createRouter();

router.post('/local', (res, req) => {
  if (!res.body.username || !res.body.password) {

  }

});

export default router;
