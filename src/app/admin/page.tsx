'use client';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLeads, reachOut } from '@/redux/features/leads-slice';
import { logout } from '@/redux/features/auth-slice';
import { useEffect } from 'react';
import { AppDispatch, useAppSelector } from '@/redux/store';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';


export default function AdminPage () {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const leads = useAppSelector((state) => state.leadsReducer.value.data);
  const status = useAppSelector((state) => state.leadsReducer.value.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLeads())
    }
  }, [status, dispatch])

  function handleReachOut (id: number) {
    dispatch(reachOut(id))
  }

  function handleLogout () {
    dispatch(logout())
      .unwrap()
      .then(() => {
        router.push('/login')
      })
  }

  return (
    <>
      <div className={styles.admin}>
        <div className={styles.sidebar}>
          <div className={styles.logo}>alma</div>
          <ul className={styles.nav}>
            <li>Leads</li>
            <li>Settings</li>
          </ul>
          <div className={styles.user}>
            <div className={styles.img}></div>
            <span>Admin</span>
            <button onClick={handleLogout}>logout</button>
          </div>
        </div>
        <div className={styles.content}>
          <h1>Leads</h1>
          <div className={styles.search}>
            <input type='text' disabled value="search"/>
          </div>

          {leads.length === 0 ? <p>no leads</p> : (
            <div className={styles.table}>
              <table>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>URL</th>
                  <th>Visas</th>
                  <th>Status</th>
                  <th></th>
                </tr>
                {leads.map((lead, idx) => {
                  let visas = JSON.parse(lead.visas); 
                  return (
                    <tr key={idx}>
                      <td>{`${lead.firstname} ${lead.lastname}`}</td>
                      <td>{lead.email}</td>
                      <td>{lead.url}</td>
                      <td>
                        {visas.join(', ')}
                      </td>
                      <td>{lead.status}</td>
                      <td>
                        {
                          lead.status === 'pending' && (
                            <button onClick={() => handleReachOut(lead.id)}>Mark as reached out</button>
                          )
                        }
                      </td>
                    </tr>
                  )
                })}

              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}