### Create `ml/.env` file with following content:

```
HOST=""
DB=""
LOGIN=""
PASSWORD=""
```

### Run inside `ml/` directory to start the server

```bash
uvicorn serve:app --env-file .env --reload
```
