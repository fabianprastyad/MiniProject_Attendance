import { Button } from "flowbite-react";

function liveAttendance() {
    const date = new Date();
    const showTime = date.getHours()
        + ':' + date.getMinutes()
        + ":" + date.getSeconds();
    const showDate = date.getDate()
        + '/' + (date.getMonth() + 1)
        + '/' + date.getFullYear()


    return (

        <div className=" mt-15 py-44 ml-24  w-5/6 border border-black ">
            <div>
                <div>
                    <h1 className="mt-0 flex justify-center mb-5 font-bold text-5xl italic">Live Attendance</h1>
                </div>
                <div className="mb-5">
                    <h2 className=" text-4xl	" align="center"> {showTime}</h2>
                    <h1 align="center">{showDate}</h1>
                </div>
                <div className="mb-5 flex flex-row justify-center space-x-5 item-center nml-24 ">
                    <Button className="bg-slate-600	" type="submit">Clock In</Button>
                    <Button className="bg-slate-600	" type="submit">Clock Out</Button>
                </div>
                <div className="flex justify-center">
                    <textarea name="note" id="" placeholder="Note" cols="80" rows="5"></textarea>
                </div>


            </div>
        </div>
    )
}

export default liveAttendance