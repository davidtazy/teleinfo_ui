import { useEffect, useState } from "react";

export default function useChrono(timeout_ms:number){
    const [chrono, setChrono] = useState<number>(0);
  
    // create timer to refresh data periodically
    useEffect(() => {
      const interval = setInterval(() => {
        setChrono((chrono) => chrono + 1);
      }, timeout_ms);
      return () => clearInterval(interval);
    }, [timeout_ms]);
  
    return [chrono]
  
  }