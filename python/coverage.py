import data.types as types  # Import type data module
import sys

if __name__ == '__main__': 

    # Get command line arguments
    args = sys.argv[1:]

    # Type effectiveness ranking
    if args[0] == "ranking":

        # Type Ranking list
        ranking = []

        # Step 1: Mono-types
        for type1 in types.TYPES:
            # Calculate coverage for single type
            coverage = types.get_coverage([type1])
            # Add single type coverage to ranking list
            ranking.append([[type1], coverage, types.get_coverage_score(coverage)])

            for type2 in types.TYPES:
                if type1 == type2:
                    continue  # Skip double-ups

                # Sort types alphabetically
                dual_type = [type1, type2]
                dual_type.sort()

                # Skip duplicate dual-types
                duplicate = False
                for rank in ranking:
                    if rank[0] == dual_type:
                        duplicate = True
                        break
                
                # Add coverage to rankings if not a duplicate
                if not duplicate:
                    dual_coverage = types.get_coverage(dual_type)
                    ranking.append([dual_type, dual_coverage, types.get_coverage_score(dual_coverage)])

        # Sort rankings based on coverage score in descending order
        ranking.sort(key=lambda x: x[2], reverse=True)

        # Print the rankings
        for rank in ranking:
            print(f"{' / '.join(rank[0])} [{rank[2]}]: {types.get_coverage_str(rank[1])}")

    else:  # Standard usage

        # Get coverage for types provided
        coverage = types.get_coverage(args)

        # Calculate score based on coverage
        score = types.get_coverage_score(coverage)

        # Print the coverage details
        print(f"{' / '.join(args)} [{score}]: {types.get_coverage_str(coverage)}")
