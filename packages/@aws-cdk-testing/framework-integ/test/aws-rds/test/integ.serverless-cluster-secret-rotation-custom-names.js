"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iam = require("aws-cdk-lib/aws-iam");
const kms = require("aws-cdk-lib/aws-kms");
const secretsmanager = require("aws-cdk-lib/aws-secretsmanager");
const cdk = require("aws-cdk-lib");
const integ_tests_alpha_1 = require("@aws-cdk/integ-tests-alpha");
const aws_rds_1 = require("aws-cdk-lib/aws-rds");
const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-cdk-rds-integ-secret-rotation');
const kmsKey = new kms.Key(stack, 'DbSecurity');
const secret = new aws_rds_1.DatabaseSecret(stack, 'test-secret', {
    username: 'admin',
    dbname: 'admindb',
    secretName: 'admin-secret',
});
const cluster = new aws_rds_1.ServerlessCluster(stack, 'Database', {
    engine: aws_rds_1.DatabaseClusterEngine.AURORA_MYSQL,
    credentials: aws_rds_1.Credentials.fromSecret(secret),
    storageEncryptionKey: kmsKey,
});
secret.addRotationSchedule('test-schedule', {
    hostedRotation: secretsmanager.HostedRotation.mysqlSingleUser(),
});
cluster.grantDataApiAccess(new iam.AccountRootPrincipal());
cluster.grantDataApiAccess(new iam.ServicePrincipal('ecs-tasks.amazonaws.com'));
new integ_tests_alpha_1.IntegTest(app, 'cdk-rds-integ-secret-rotation', {
    testCases: [stack],
});
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWcuc2VydmVybGVzcy1jbHVzdGVyLXNlY3JldC1yb3RhdGlvbi1jdXN0b20tbmFtZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnRlZy5zZXJ2ZXJsZXNzLWNsdXN0ZXItc2VjcmV0LXJvdGF0aW9uLWN1c3RvbS1uYW1lcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUEyQztBQUMzQywyQ0FBMkM7QUFDM0MsaUVBQWlFO0FBQ2pFLG1DQUFtQztBQUNuQyxrRUFBdUQ7QUFDdkQsaURBQTRHO0FBRTVHLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFCLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsbUNBQW1DLENBQUMsQ0FBQztBQUV0RSxNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ2hELE1BQU0sTUFBTSxHQUFHLElBQUksd0JBQWMsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFO0lBQ3RELFFBQVEsRUFBRSxPQUFPO0lBQ2pCLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLFVBQVUsRUFBRSxjQUFjO0NBQzNCLENBQUMsQ0FBQztBQUVILE1BQU0sT0FBTyxHQUFHLElBQUksMkJBQWlCLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRTtJQUN2RCxNQUFNLEVBQUUsK0JBQXFCLENBQUMsWUFBWTtJQUMxQyxXQUFXLEVBQUUscUJBQVcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQzNDLG9CQUFvQixFQUFFLE1BQU07Q0FDN0IsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsRUFBRTtJQUMxQyxjQUFjLEVBQUUsY0FBYyxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUU7Q0FDaEUsQ0FBQyxDQUFDO0FBRUgsT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksR0FBRyxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztBQUMzRCxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxHQUFHLENBQUMsZ0JBQWdCLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDO0FBRWhGLElBQUksNkJBQVMsQ0FBQyxHQUFHLEVBQUUsK0JBQStCLEVBQUU7SUFDbEQsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDO0NBQ25CLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGlhbSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcbmltcG9ydCAqIGFzIGttcyBmcm9tICdhd3MtY2RrLWxpYi9hd3Mta21zJztcbmltcG9ydCAqIGFzIHNlY3JldHNtYW5hZ2VyIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zZWNyZXRzbWFuYWdlcic7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgSW50ZWdUZXN0IH0gZnJvbSAnQGF3cy1jZGsvaW50ZWctdGVzdHMtYWxwaGEnO1xuaW1wb3J0IHsgQ3JlZGVudGlhbHMsIFNlcnZlcmxlc3NDbHVzdGVyLCBEYXRhYmFzZUNsdXN0ZXJFbmdpbmUsIERhdGFiYXNlU2VjcmV0IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLXJkcyc7XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5jb25zdCBzdGFjayA9IG5ldyBjZGsuU3RhY2soYXBwLCAnYXdzLWNkay1yZHMtaW50ZWctc2VjcmV0LXJvdGF0aW9uJyk7XG5cbmNvbnN0IGttc0tleSA9IG5ldyBrbXMuS2V5KHN0YWNrLCAnRGJTZWN1cml0eScpO1xuY29uc3Qgc2VjcmV0ID0gbmV3IERhdGFiYXNlU2VjcmV0KHN0YWNrLCAndGVzdC1zZWNyZXQnLCB7XG4gIHVzZXJuYW1lOiAnYWRtaW4nLFxuICBkYm5hbWU6ICdhZG1pbmRiJyxcbiAgc2VjcmV0TmFtZTogJ2FkbWluLXNlY3JldCcsXG59KTtcblxuY29uc3QgY2x1c3RlciA9IG5ldyBTZXJ2ZXJsZXNzQ2x1c3RlcihzdGFjaywgJ0RhdGFiYXNlJywge1xuICBlbmdpbmU6IERhdGFiYXNlQ2x1c3RlckVuZ2luZS5BVVJPUkFfTVlTUUwsXG4gIGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscy5mcm9tU2VjcmV0KHNlY3JldCksXG4gIHN0b3JhZ2VFbmNyeXB0aW9uS2V5OiBrbXNLZXksXG59KTtcblxuc2VjcmV0LmFkZFJvdGF0aW9uU2NoZWR1bGUoJ3Rlc3Qtc2NoZWR1bGUnLCB7XG4gIGhvc3RlZFJvdGF0aW9uOiBzZWNyZXRzbWFuYWdlci5Ib3N0ZWRSb3RhdGlvbi5teXNxbFNpbmdsZVVzZXIoKSxcbn0pO1xuXG5jbHVzdGVyLmdyYW50RGF0YUFwaUFjY2VzcyhuZXcgaWFtLkFjY291bnRSb290UHJpbmNpcGFsKCkpO1xuY2x1c3Rlci5ncmFudERhdGFBcGlBY2Nlc3MobmV3IGlhbS5TZXJ2aWNlUHJpbmNpcGFsKCdlY3MtdGFza3MuYW1hem9uYXdzLmNvbScpKTtcblxubmV3IEludGVnVGVzdChhcHAsICdjZGstcmRzLWludGVnLXNlY3JldC1yb3RhdGlvbicsIHtcbiAgdGVzdENhc2VzOiBbc3RhY2tdLFxufSk7XG5cbmFwcC5zeW50aCgpO1xuIl19