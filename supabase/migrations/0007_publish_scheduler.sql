-- Every 5 minutes, ask the app to publish posts that are due. The bearer token lives in Supabase Vault.
-- Replace <CRON_SECRET> with the same value as the CRON_SECRET env var in Vercel, and the URL with your host.
create extension if not exists pg_cron;
create extension if not exists pg_net;
select vault.create_secret('<CRON_SECRET>', 'frontman_cron_secret', 'Bearer token for /api/cron/publish');
select cron.schedule(
  'frontman-publish-due',
  '*/5 * * * *',
  $$
  select net.http_post(
    url := 'https://frontman-terminal.vercel.app/api/cron/publish',
    headers := jsonb_build_object(
      'content-type', 'application/json',
      'authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'frontman_cron_secret')
    ),
    body := '{}'::jsonb,
    timeout_milliseconds := 290000
  );
  $$
);
