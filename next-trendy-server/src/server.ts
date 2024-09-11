import app from './app';
import seedSuperAdmin from './app/DB';
import config from './app/config';

import mongoose from 'mongoose';

async function server() {
  try {
    await mongoose.connect(config.database_url as string);
    seedSuperAdmin();
    app.listen(config.port, () => {
      console.log(`TrendyLeather app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

server();
