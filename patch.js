const fs = require('fs');
let content = fs.readFileSync('src/features/registry/actions.test.ts', 'utf8');
content = content.replace(/it\('should return mock components fallback when fetching components fails', async \(\) => \{[\s\S]*?\}\);/,
`it('should return mock components fallback when fetching components fails', async () => {
      const error = new Error('Simulated ComponentsRepository error');
      mockGetPublicComponents.mockRejectedValue(error);

      const result = await getComponents('TestCategory');

      expect(result).toEqual(ELITE_MOCK_COMPONENTS);
      expect(console.error).toHaveBeenCalledWith('SYSTEM: [Database_Error] Fetching components failed:', error);
    });

    it('should return ELITE_MOCK_COMPONENTS when repository throws an error for a specific category', async () => {
      const testError = new Error('Database connection failed for category');
      mockGetPublicComponents.mockRejectedValue(testError);

      const result = await getComponents('Buttons');

      expect(result).toEqual(ELITE_MOCK_COMPONENTS);
      expect(console.error).toHaveBeenCalledWith('SYSTEM: [Database_Error] Fetching components failed:', testError);
    });`);
fs.writeFileSync('src/features/registry/actions.test.ts', content);
