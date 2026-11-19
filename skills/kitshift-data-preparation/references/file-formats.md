# File formats and exports

Inspect metadata and a bounded preview before scanning. Record selected columns, actual reader/version, parsing choices, resource limits and whether each finding covers a sample or the population. Use supported chunk or row-group processing when needed. A corrupt, encrypted, unreadable or unsupported input blocks that input, not independent authorized profiling. Clarify ambiguous layouts rather than guessing.

## CSV

Establish encoding, delimiter, quoting, headers and an explicit missing-token policy before conversion. Read identifiers and long numbers lexically at ingestion; a later string cast cannot recover zeros or precision lost to inference. Literal `NA` and `NULL` remain values unless the source contract makes them missing. Treat malformed rows as a blocking parse/repair issue, never silently skip them. A zero-byte file has no schema; a header-only file can have a valid schema and zero rows. Detect duplicate headers rather than silently ignoring them; a preview cannot establish global uniqueness. Specify date formats, timezones, decimal and thousands conventions rather than inferring business meaning.

## XLSX

Inspect sheet names and header/data boundaries before selecting a table. Distinguish stored text, numeric values, display number formats, formulas and cached results. A numeric cell displayed with zeros does not prove its original lexical identifier. Readers such as openpyxl do not evaluate formulas: absent or potentially stale cached results are unresolved, not computed or refreshed facts. Do not launch a spreadsheet application or refresh external links. Read the workbook without replacing it and write separate tabular outputs; do not promise workbook feature round-tripping. Trace affected cells.

## Parquet

Inspect the actual reader's schema and relevant metadata before conversion. Preserve declared identifier strings, nulls, exact decimals and timestamp units/timezones; record any necessary conversion and verify schema and values by re-reading. Do not cast the whole dataset to strings or silently substitute floats for decimals. If a reader or codec is missing, report the prerequisite without installing packages or changing environments implicitly. Compatibility must be verified for the actual versions and schema, not assumed across engines.

## Exports

Canonical machine data preserves values and has schema and reload instructions, especially for CSV identifiers and nulls. Formula-like strings are untrusted data: warn that a machine CSV containing them is not a human spreadsheet-viewing artifact. Do not silently prefix or sanitize canonical values, or claim CSV is universally spreadsheet-safe. If a human spreadsheet export is requested, create a separate new XLSX with untrusted strings explicitly written as text cells and verify their cell types on reopening; never turn those strings into formula cells. If a text-safe writer is unavailable, withhold that export and report the gap.
