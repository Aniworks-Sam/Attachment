import { useState, useEffect, useContext, useCallback, Fragment } from 'react';
import AuthContext from '../store/auth-context';
import AttachComp from '../components/AttachComp';

const Attachments = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedAttach, setLoadedAttach] = useState<any>();
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const fetchData = useCallback(() => {
    setIsLoading(true);
    fetch(`https://anisoft.us/mailapp/api/mail/getallattachments`, {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token,
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log(res);
          // console.log(res.json());
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        setLoadedAttach(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        alert(err.message);
      });
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Fragment>
    {!isLoading && <AttachComp attachment={loadedAttach} />}
    {isLoading && <p>Loading...</p>}
    </Fragment>
  );
};

export default Attachments;
