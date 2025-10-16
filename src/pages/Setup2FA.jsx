import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import api from "../api";

export default function Setup2FA() {
    const [qrSvg, setQrSvg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async funtion getQr()   {
            try{
                const res = await api.post("/setup-2fa");
                setQrSvg(window.atob(res.data.qr.split(",")[1]));
            } catch (err) {
                console.error("Error fetching QR code:", err);
            }

            }

        getQr();
    }, []);

    return (
        <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-blue-600">Set Up Google Authenticator</h2>
      <p className="mb-4 text-gray-700">Scan this QR code with your authenticator app.<br/>Then click Next to verify.</p>
      <div className="bg-gray-100 p-4 flex justify-center">
        {qrSvg ? <div dangerouslySetInnerHTML={{ __html: qrSvg }} /> : <b>Loading QR...</b>}
      </div>
      <button className="btn bg-blue-600 text-white mt-6" onClick={()=>navigate("/2fa")}>Next</button>
    </div>
  );
}

