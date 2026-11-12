-- Raw (1) to Polished (5) edit style. Business default is 2 (Natural); a script can override it.
-- The full value also lives in `data`; these columns make it queryable for the Edit stage.

alter table public.businesses
  add column if not exists edit_style smallint not null default 2 check (edit_style between 1 and 5);

alter table public.scripts
  add column if not exists edit_style smallint check (edit_style is null or edit_style between 1 and 5);
