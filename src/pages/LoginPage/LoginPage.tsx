import styles from './loginPage.module.css';
import { useLogin } from '../../hooks/useLogin';
import Input from '../../components/Input/Input';

const LoginPage = () => {
  const { idInstance, apiTokenInstance, error, errors, handleLogin, handleInputChange } = useLogin();

  return (
    <div className={styles['login-container']}>
      <div className={styles.left}>Войдите чтобы начать общаться</div>
      <div className={styles.right}>
        <form className={styles.form} onSubmit={handleLogin}>
          <Input
            value={idInstance}
            name="idInstance"
            onChange={handleInputChange}
            placeholder="ID Instance"
            error={errors.idInstance || error}
          />
          <Input
            type="password"
            value={apiTokenInstance}
            name="apiTokenInstance"
            onChange={handleInputChange}
            placeholder="API Token"
            error={errors.apiTokenInstance || error}
          />
          <div className={styles['error-container']}>
            {(errors.idInstance || errors.apiTokenInstance || error) && <span className={styles.error}>{error}</span>}
          </div>
          <button className={styles['login-button']} type="submit">
            Вход
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
