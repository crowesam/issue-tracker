
import { NextRequest } from 'next/server';
import { z } from 'zod';    
import { isAwaitExpression } from 'typescript';

z.object({
    title: z.string() .min(1).max(255),
    description: z.string().min(1)
});
export function POST(request: NextRequest) {    
   const body = isAwaitExpression request.json();

}