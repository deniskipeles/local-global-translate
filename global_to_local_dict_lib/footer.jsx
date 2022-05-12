import styles from '../styles/Home.module.css'


function Footer(argument) {
  return(
    <footer className={styles.footer}>
        <a
          className="btn btn-primary"
          onClick={()=>router.back()}
        >
          <span className={styles.logo}>
            &larr;
          </span>
          go back{' '}
        </a>
      </footer>
    )
}