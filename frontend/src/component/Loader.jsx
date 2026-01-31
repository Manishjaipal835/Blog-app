function Loader() {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Adding your blog, please wait...</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "60px",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #e0e0e0",
    borderTop: "5px solid #4f46e5", // indigo color
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  text: {
    marginTop: "15px",
    fontSize: "18px",
    fontWeight: "500",
    color: "#444",
  },
};

export default Loader;
