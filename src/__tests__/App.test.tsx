import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { TableProvider } from '../providers/TableProvider';
import App from '../App';
import { mockTableData } from '../mocks';
import { dataService } from '../services/dataService';

// Mock the data service
jest.mock('../services/dataService', () => ({
    dataService: {
        fetchTableData: jest.fn(),
        updateTableData: jest.fn(),
    }
}));

// Update the mock data to match the actual table structure

describe('App Table Component', () => {
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();

        // Setup default mock implementation
        (dataService.fetchTableData as jest.Mock).mockResolvedValue(mockTableData);
    });

    it('loads and displays table data on mount', async () => {
        // Log mock data before render
        console.log('Mock data before render:', mockTableData);
        
        const { container, debug } = render(
            <div 
                data-testid="table-container"
                style={{ 
                    height: '800px',
                    width: '1200px', 
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    // Add these to ensure the div takes up space
                    minHeight: '800px',
                    minWidth: '1200px',
                    border: '1px solid red' // Makes it easier to see in debug
                }}
            >
                <TableProvider 
                    initialRows={mockTableData as any}
                    initialSorts={[{
                        key: 'daily_simple_roi',
                        type: 'percentage',
                        direction: 'desc'
                    }]}
                >
                    <App />
                </TableProvider>
            </div>
        );

        // Add immediate dimension check
        console.log('Initial container dimensions:', {
            offsetHeight: container.offsetHeight,
            offsetWidth: container.offsetWidth,
            clientHeight: container.clientHeight,
            clientWidth: container.clientWidth,
            scrollHeight: container.scrollHeight,
            scrollWidth: container.scrollWidth
        });

        // Immediately after render
        console.log('Immediately after render:');
        console.log('Container HTML:', container.innerHTML);
        
        // Wait and check multiple times
        await act(async () => {
            for (let i = 0; i < 3; i++) {
                await new Promise(resolve => setTimeout(resolve, 100));
                console.log(`Check ${i + 1} (${100 * (i + 1)}ms):`);
                
                // Check virtual grid
                const virtualGrid = container.querySelector('[role="grid"]');
                console.log('Virtual grid:', virtualGrid?.outerHTML);
                
                // Check table cells
                const tableCells = container.getElementsByClassName('table-cell');
                console.log('Table cells:', tableCells.length);
                
                // Check all elements with position: absolute (virtual grid cells)
                const absoluteElements = container.querySelectorAll('[style*="position: absolute"]');
                console.log('Absolute positioned elements:', absoluteElements.length);
                
                // Log overall structure
                console.log('Current DOM structure:');
                debug();
            }
        });

        await waitFor(() => {
            const tableCells = container.getElementsByClassName('table-cell');
            const virtualGrid = container.querySelector('[role="grid"]');
            const absoluteElements = container.querySelectorAll('[style*="position: absolute"]');
            
            console.log('Final check:', {
                tableCells: tableCells.length,
                virtualGridPresent: !!virtualGrid,
                absoluteElements: absoluteElements.length,
                containerHeight: container.offsetHeight,
                containerWidth: container.offsetWidth,
                html: container.innerHTML
            });
            
            expect(tableCells.length).toBeGreaterThan(0);
        }, { 
            timeout: 2000,
            onTimeout: (error) => {
                console.log('Timeout reached. Final state:');
                debug();
                return error;
            }
        });
    });
});
