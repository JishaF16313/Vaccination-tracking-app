import React, {useEffect} from "react"
import Header from "../components/header";
import Footer from "../components/footer";
import Route from '../routes/routes';
import {makeStyles} from "@material-ui/core/styles"
import {useDispatch} from "react-redux"
import {checkAuth} from "../store/actions/auth"

const useStyles = makeStyles({
  app: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  main: {
    flexGrow: 1
  }
})

function App() {
  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return (
    <div className={classes.app}>
      <Header />
      <main className={classes.main}>
      <Route />
      </main>
      <Footer />
    </div>
  );
}

export default App;
