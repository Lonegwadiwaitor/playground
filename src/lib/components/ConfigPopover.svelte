<script lang="ts">
  import { Popover } from 'bits-ui';
  import { settings, setMode, setSolver, type LuauMode, type SolverMode } from '$lib/stores/settings';
  import { Button } from '$lib/components/ui/button';
  import { refreshDiagnostics } from '$lib/editor/setup';

  let open = $state(false);

  const modeOptions: { value: LuauMode; label: string; description: string }[] = [
    { value: 'strict', label: 'Strict', description: 'Full type checking with strict rules' },
    { value: 'nonstrict', label: 'Nonstrict', description: 'Relaxed type checking (default)' },
    { value: 'nocheck', label: 'No Check', description: 'Disable type checking' },
  ];

  const solverOptions: { value: SolverMode; label: string; description: string }[] = [
    { value: 'new', label: 'New Solver', description: 'Modern constraint-based type solver' },
    { value: 'old', label: 'Old Solver', description: 'Legacy type inference solver' },
  ];

  function handleModeChange(mode: LuauMode) {
    setMode(mode);
    // Give WASM time to update, then refresh diagnostics
    setTimeout(() => refreshDiagnostics(), 50);
  }

  function handleSolverChange(solver: SolverMode) {
    setSolver(solver);
    // Give WASM time to update, then refresh diagnostics
    setTimeout(() => refreshDiagnostics(), 50);
  }
</script>

<Popover.Root bind:open>
  <Popover.Trigger>
    {#snippet child({ props })}
      <Button {...props} size="sm" variant="ghost" class="w-8 sm:w-9 text-lg">
        ⚙
      </Button>
    {/snippet}
  </Popover.Trigger>
  
  <Popover.Portal>
    <Popover.Content
      class="config-popover z-50 w-72 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 shadow-xl"
      sideOffset={8}
      align="end"
    >
      <div class="space-y-4">
        <div>
          <h3 class="text-sm font-semibold text-[var(--text-primary)] mb-1">Settings</h3>
          <p class="text-xs text-[var(--text-muted)]">Configure type checking behavior</p>
        </div>

        <!-- Mode Selection -->
        <div class="space-y-2" role="radiogroup" aria-labelledby="mode-label">
          <span id="mode-label" class="text-xs font-medium text-[var(--text-secondary)]">Type Check Mode</span>
          <div class="space-y-1">
            {#each modeOptions as option}
              {@const isSelected = $settings.mode === option.value}
              <button
                type="button"
                role="radio"
                aria-checked={isSelected}
                class="w-full flex items-start gap-3 p-2 rounded-md transition-colors text-left border
                  {isSelected 
                    ? 'bg-[var(--bg-tertiary)] border-[var(--accent)]' 
                    : 'hover:bg-[var(--bg-tertiary)] border-transparent'}"
                onclick={() => handleModeChange(option.value)}
              >
                <div class="w-4 h-4 mt-0.5 rounded-full border-2 flex items-center justify-center shrink-0
                  {isSelected ? 'border-[var(--accent)]' : 'border-[var(--text-muted)]'}">
                  {#if isSelected}
                    <div class="w-2 h-2 rounded-full bg-[var(--accent)]"></div>
                  {/if}
                </div>
                <div>
                  <div class="text-sm font-medium text-[var(--text-primary)]">{option.label}</div>
                  <div class="text-xs text-[var(--text-muted)]">{option.description}</div>
                </div>
              </button>
            {/each}
          </div>
        </div>

        <!-- Solver Selection -->
        <div class="space-y-2" role="radiogroup" aria-labelledby="solver-label">
          <span id="solver-label" class="text-xs font-medium text-[var(--text-secondary)]">Type Solver</span>
          <div class="space-y-1">
            {#each solverOptions as option}
              {@const isSelected = $settings.solver === option.value}
              <button
                type="button"
                role="radio"
                aria-checked={isSelected}
                class="w-full flex items-start gap-3 p-2 rounded-md transition-colors text-left border
                  {isSelected 
                    ? 'bg-[var(--bg-tertiary)] border-[var(--accent)]' 
                    : 'hover:bg-[var(--bg-tertiary)] border-transparent'}"
                onclick={() => handleSolverChange(option.value)}
              >
                <div class="w-4 h-4 mt-0.5 rounded-full border-2 flex items-center justify-center shrink-0
                  {isSelected ? 'border-[var(--accent)]' : 'border-[var(--text-muted)]'}">
                  {#if isSelected}
                    <div class="w-2 h-2 rounded-full bg-[var(--accent)]"></div>
                  {/if}
                </div>
                <div>
                  <div class="text-sm font-medium text-[var(--text-primary)]">{option.label}</div>
                  <div class="text-xs text-[var(--text-muted)]">{option.description}</div>
                </div>
              </button>
            {/each}
          </div>
        </div>
      </div>
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>

