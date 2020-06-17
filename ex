[1mdiff --git a/api/index.js b/api/index.js[m
[1mindex b54abba..96f5ad1 100644[m
[1m--- a/api/index.js[m
[1m+++ b/api/index.js[m
[36m@@ -54,15 +54,17 @@[m [mapp.get('/api/products-list', async (req, res) => {[m
     }[m
 })[m
 [m
[31m-app.get('/api/:category',(req, res) => {[m
[32m+[m[32mapp.get('/api/:category', async(req, res) => {[m
   const category = req.params.category [m
   let page = (req.query.page || 1) -1 [m
   const limit = 16 [m
[32m+[m[32m  const pagesNumber =Math.ceil (await productSchema.find({category}).length / 16)[m[41m [m
   productSchema.find({category}).skip(page * limit).limit(limit).then(result =>{[m
     if(result) {[m
       res.send({[m
         status: "200",[m
[31m-        products: result   [m
[32m+[m[32m        products: result,[m
[32m+[m[32m        pagesNumber[m[41m    [m
       })[m
     }[m
     else {[m
