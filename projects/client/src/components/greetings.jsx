const WelcomeMenuComponent = ({ user }) => {
    return user ? (
        <div
            style={{ height: "94vh" }}
            className="flex justify-center items-center bg-slate-100"
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "52px",
                    height: "94vh",
                    width: "1000px",
                    justifyContent: "center",
                    backgroundColor: "white",
                }}
            >
                <h1 className="text-6xl text-slate-300"> welcome,{user}</h1>
            </div>
        </div>
    ) : (
        <div
            style={{ height: "94vh" }}
            className="flex justify-center items-center bg-slate-100"
        >
            <div
                style={{
                    width: "1000px",
                    alignItems: "center",
                    backgroundColor: "grey",
                    height: "94vh",
                    display: "flex",
                    justifyContent: "center",
                    paddingLeft: "52px",
                }}
            >
                <h1 className="text-6xl text-slate-300	">Welcome, Admin</h1>
            </div>
        </div>
    );
};

export default WelcomeMenuComponent;