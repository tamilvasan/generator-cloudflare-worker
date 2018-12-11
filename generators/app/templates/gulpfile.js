var gulp = require('gulp');
var ts = require('gulp-typescript');
var preprocess = require("gulp-preprocess");
var replace = require('gulp-just-replace');
var print = require('gulp-print').default;
var config = require('./config.json');
var rest = require('node-fetch');
const fs = require('fs');
const path = require('path');

gulp.task('transform', function () {
    var tsProject = ts.createProject('tsconfig.json');
    return gulp.src('src/**/*.ts')
        .pipe(print(filepath => `source: ${filepath}`))
        .pipe(tsProject())
        .pipe(preprocess())
        .pipe(replace(/export.*class/g,'class')) // remove export keyword from the transformed js file
        .pipe(print(filepath => `tranformed: ${filepath}`))
        .pipe(gulp.dest('lib'))
});
gulp.task('publishdev', function () {
    publishWorker();
});
gulp.task('publish', function () {
    publishWorker('production');
});
gulp.task('build', ['transform']);

function publishWorker(environment){
    let isEnterprise = process.env[config.cf_pricing] === 'enterprise';
    environment = environment || 'development';
    if(isEnterprise)
        enterprisePublish(environment);
    else
        professionalPublish(environment);
}

function enterprisePublish(environment){
    let workerEndpoint= config.enterprise.endpoint;
    let url = `${config.api_endpoint}${workerEndpoint.upload_worker}`;
    url=url.replace(':accountid',process.env[config.accountid]);
    let envConfig = config[environment];
    envConfig.workers.forEach(worker => {
        let workerItem = worker;
        let uploadEndpoint=url.replace(':script_name',workerItem.script_name);
        uploadWorker(uploadEndpoint,workerItem.script_path,()=> {
            workerItem.routes.forEach(route =>{
                let routeEndpoint = config.api_endpoint + (route.id ? workerEndpoint.update_route : workerEndpoint.create_route);
                routeEndpoint = routeEndpoint.replace(":zone_id",process.env[config.zoneid]);
                let routeItem = {pattern:route.route,script_name:worker.script_name,is_update:false}
                if(route.id){
                    routeEndpoint = routeEndpoint.replace(":route_id",route.id);
                    routeItem.is_update = true;
                }
                setTimeout( () => { mapRouteToScript(routeEndpoint,routeItem);},1000);
            });
        });
    });
}

function uploadWorker(apiEndPoint,scriptPath,callback) {
    scriptPath = path.resolve(scriptPath);
    if (!fs.existsSync(scriptPath)) {
        console.error(`path not found ${scriptPath}`);
    }
    let script = fs.readFileSync(scriptPath);
    let options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/javascript' },
        body:script        
    };
    options = appendApiHeaders(options);
    sendRequest(apiEndPoint,options,callback);
}

function appendApiHeaders(options){
    options.headers['X-Auth-Email'] = process.env[config.email];
    options.headers['X-Auth-Key'] = process.env[config.auth_key];
    options.headers['User-Agent'] = 'Cloudflare Worker CI/CD';
    return options;
}

function sendRequest(url,options,callback){
    rest(url,options).then(res=>{
        if(res.ok && callback)
           callback();
    }).catch(err => console.error(err));
}

function mapRouteToScript(url,routeItem){
    let options = {
        method: routeItem.isUpdate ? 'PUT':'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"pattern":routeItem.pattern,"script":routeItem.script_name})     
    };
    options = appendApiHeaders(options);
    sendRequest(url,options);
}

function professionalPublish(){
    let workerEndpoint= config.pro_or_less.endpoint;
    let url = `${config.api_endpoint}${workerEndpoint.upload_worker}`;
    url = url.replace(":zone_id",process.env[config.zone_id]);
    let envConfig = config[environment];
    envConfig.workers.forEach(worker => {
        uploadWorker(url,worker);
    });
}