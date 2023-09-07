import "./load-env-vars";

import { boostrap } from "./app-config";
import { initMongoose } from "./db";

initMongoose()
  .then(() => {
    boostrap();
  })
  .catch(e => {
    console.log(e);
  });
