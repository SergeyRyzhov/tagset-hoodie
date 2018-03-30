import Logger from '../core/logger.js'
const logger = Logger.getLogger("account.service");

function AccountService(hoodie) {
    const sharedUser = {
        username: 'githubpages_shareduser',
        password: '96a48b0297265dc2d41052741c015fef2e546c92'
    };

    function validate(user) {
        return hoodie.account.get('session').then(session => {
            if (session) {
                hoodie.log.info('Signed in');
            } else {
                return signInOrUp(user);
            }
        }).catch(reason => logger.error('session is unavailable', reason));
    }

    function signInOrUp(user) {
        return hoodie.account.validate(user).then(() => {
            hoodie.account.signIn(user).then(accountAttributes => {
                hoodie.log.info('Signed in as %s', accountAttributes.username)
            }).catch(error => {
                hoodie.log.error(error);
                return signUp(user);
            });
        }).catch(() => {
            return signUp(user);
        });
    }

    function signUp(user) {
        return hoodie.account.signUp(user).then(accountAttributes => {
            hoodie.log.info('Signed up as %s', accountAttributes.username)
            hoodie.account.signIn(user).then(accountAttributes => {
                hoodie.log.info('Signed in as %s', accountAttributes.username)
            }).catch(error => {
                hoodie.log.error(error)
            });
        });
    }



    return {
        sharedUser,
        validate,
        signInOrUp
    };
}

export default AccountService;