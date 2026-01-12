import pg from "pg"
export async function connect(config) {
    if (typeof config.password !== "string") {
        throw new Error(
            "[TomatoPostgresqlConnect] password must be a string"
        )
    }

    const pool = new pg.Pool({
        user: config.user,
        password: config.password,
        host: config.host,
        port: config.port,
        database: config.database,
        ssl: config.ssl,
    })

    try {
        await pool.query("select 1")
        return pool
    } catch (err) {
        throw new Error(
            "[TomatoPostgresqlConnect] connection test failed",
            { cause: err }
        )
    }
}
