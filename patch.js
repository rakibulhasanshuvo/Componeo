const fs = require('fs');
let content = fs.readFileSync('src/features/registry/actions.test.ts', 'utf8');
content = content.replace(/<<<<<<< Updated upstream([\s\S]*?)>>>>>>> Stashed changes/,
`    it('should return mock components fallback when fetching components fails', async () => {
      const error = new Error('Simulated ComponentsRepository error');
      mockGetPublicComponents.mockRejectedValue(error);

      const result = await getComponents('TestCategory');

      expect(result).toEqual(ELITE_MOCK_COMPONENTS);
      expect(console.error).toHaveBeenCalledWith('SYSTEM: [Database_Error] Fetching components failed:', error);`);
fs.writeFileSync('src/features/registry/actions.test.ts', content);
